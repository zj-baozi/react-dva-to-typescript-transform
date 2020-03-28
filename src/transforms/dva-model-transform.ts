import * as ts from "typescript";
import * as helpers from "../helpers";
import * as _ from "lodash";

export type Factory = ts.TransformerFactory<ts.SourceFile>;

/**
 * declare class variables
 *
 * @example
 * Before:
 * export default {
 *  namespace: 'collection',
 *  state: {
 *    limitIncreaseAmount: null,
 *    maxLevel: null
 *  },
 *  reducers: {
 *    setState(state, { payload }) {
 *      return { ...state, ...payload };
 *    },
 *  },
 *  effects: {
 *    *init(_, { call, put }) {
 *      return true;
 *    },
 *  },
 * };
 * After:
 * import { Effect } from 'dva';
 * import { Reducer } from 'redux';
 * interface CollectionStateType {
 *    limitIncreaseAmount: null,
 *    maxLevel: null
 *  }
 *  interface CollectionModelsType {
 *    namespace: 'collection',
 *    state: CollectionStateType,
 *    effects: {
 *      init: Effect
 *    },
 *    reducers: {
 *      setState: Reducer<CollectionStateType>;
 *    };
 *  }
 *  const CollectionModels:CollectionModelsType = {
 *    namespace: 'collection',
 *    state: {
 *      limitIncreaseAmount: null,
 *      maxLevel: null
 *    },
 *    reducers: {
 *      setState(state, { payload }) {
 *        return { ...state, ...payload };
 *      },
 *    },
 *    effects: {
 *      *init(_, { call, put }) {
 *        return true;
 *      },
 *    }
 *  };
 *  export default CollectionModels;
 */
let STATE_TYPE_NAME = "";
const DEFAULT_EXPORT_MODEL_NAME = "Models";
let EXPORT_MODEL_NAME = "Models";
export function dvaModelTransformFactoryFactory(
  typeChecker: ts.TypeChecker
): Factory {
  return function dvaModelTransformFactory(context: ts.TransformationContext) {
    return function dvaModelTransform(sourceFile: ts.SourceFile) {
      const visited = visitSourceFile(sourceFile);

      ts.addEmitHelpers(visited, context.readEmitHelpers());
      return visited;
    };
  };
}
// import { Effect } from 'dva';
function dvaImportDeclaration() {
  const dva = ts.createLiteral("dva");
  const dvaImport = ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamedImports([
        ts.createImportSpecifier(undefined, ts.createIdentifier("Effect"))
      ])
    ),
    dva
  );
  return dvaImport;
}

// import { Reducer } from 'redux';
function reduxImportDelaration() {
  const reduxImport = ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamedImports([
        ts.createImportSpecifier(undefined, ts.createIdentifier("Reducer"))
      ])
    ),
    ts.createLiteral("redux")
  );
  return reduxImport;
}

function visitSourceFile(sourceFile: ts.SourceFile) {
  helpers.visitor(sourceFile.statements, statement => {
    if (ts.isObjectLiteralExpression(statement)) {
      const defaultStatement = statement;
      const nameSpace = getNameSpaceFromPropTypeObjectLiteral(statement);
      // not dva model
      if (!nameSpace) {
        return statement;
      }
      // VariableDeclaration
      const variableDeclation = statement.parent;
      // get model name
      let modelName = "";
      if (variableDeclation && ts.isVariableDeclaration(variableDeclation)) {
        modelName = variableDeclation.name.getText();
        EXPORT_MODEL_NAME = modelName ? modelName : EXPORT_MODEL_NAME;
      } else {
        EXPORT_MODEL_NAME = DEFAULT_EXPORT_MODEL_NAME;
      }
      const variableDeclationList =
        variableDeclation && variableDeclation.parent;
      const variableStatements =
        variableDeclationList && variableDeclationList.parent;
      let variableStatement;
      if (variableStatements && ts.isVariableStatement(variableStatements)) {
        variableStatement = variableStatements;
      }
      // export default Models;
      const exportAssignment = ts.createExportAssignment(
        undefined,
        undefined,
        false,
        ts.createIdentifier(EXPORT_MODEL_NAME)
      );

      STATE_TYPE_NAME = `${nameSpace}StateType`;
      const modelTypeName = `${nameSpace}ModelType`;
      const stateType = getStateTypeOfDvaModel(statement);
      const reducersType = getReducerTypeOfDvaModel(statement);
      const effectType = getEffectTypeOfDvaModel(statement);
      const stateTypeDeclaration = ts.createTypeAliasDeclaration(
        [],
        [],
        ts.createIdentifier(STATE_TYPE_NAME),
        [],
        stateType
      );
      const namespaceModelType = nameSpace
        ? ts.createPropertySignature(
            undefined,
            ts.createIdentifier("namespace"),
            undefined,
            ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            undefined
          )
        : undefined;

      const stateModelType = stateType
        ? ts.createPropertySignature(
            undefined,
            ts.createIdentifier("state"),
            undefined,
            ts.createTypeReferenceNode(
              ts.createIdentifier(STATE_TYPE_NAME),
              stateType
            ),
            undefined
          )
        : undefined;

      const effectModelType = effectType
        ? ts.createPropertySignature(
            undefined,
            ts.createIdentifier("effects"),
            undefined,
            ts.createTypeReferenceNode(effectType, undefined),
            undefined
          )
        : undefined;

      const reducersModelType = reducersType
        ? ts.createPropertySignature(
            undefined,
            ts.createIdentifier("reducers"),
            undefined,
            ts.createTypeReferenceNode(reducersType, undefined),
            undefined
          )
        : undefined;

      const modelVariableStatement = ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
          [
            ts.createVariableDeclaration(
              ts.createIdentifier(EXPORT_MODEL_NAME),
              ts.createTypeReferenceNode(
                ts.createIdentifier(modelTypeName),
                undefined
              ),
              defaultStatement
            )
          ],
          ts.NodeFlags.Const
        )
      );
      const setModelTypeArr = [];
      namespaceModelType && setModelTypeArr.push(namespaceModelType);
      stateModelType && setModelTypeArr.push(stateModelType);
      effectModelType && setModelTypeArr.push(effectModelType);
      reducersModelType && setModelTypeArr.push(reducersModelType);

      const globalModelTypeValue = ts.createTypeLiteralNode(setModelTypeArr);
      const globalModelTypeDeclaration = ts.createTypeAliasDeclaration(
        undefined,
        undefined,
        ts.createIdentifier(modelTypeName),
        undefined,
        globalModelTypeValue
      );

      const dvaImport = dvaImportDeclaration();
      const reduxImport = reduxImportDelaration();
      const allTypeStatement = [];
      effectModelType && allTypeStatement.push(dvaImport);
      reducersModelType && allTypeStatement.push(reduxImport);
      allTypeStatement.push(stateTypeDeclaration);
      allTypeStatement.push(globalModelTypeDeclaration);
      const defaultExportAssignment =
        variableStatement ||
        (_.find(sourceFile.statements, item =>
          ts.isExportAssignment(item)
        ) as {});

      let statements = helpers.replaceItem(
        sourceFile.statements,
        defaultExportAssignment,
        modelVariableStatement
      );
      statements = helpers.insertBefore(
        statements,
        modelVariableStatement,
        allTypeStatement
      );
      if (!variableStatement) {
        statements = helpers.insertAfter(
          statements,
          modelVariableStatement,
          exportAssignment
        );
      }
      // @ts-ignore
      sourceFile = ts.updateSourceFileNode(sourceFile, statements);
      return sourceFile;
    }
    return sourceFile;
  });
  return sourceFile;
}

function getStateTypeOfDvaModel(
  objectLiteral: ts.ObjectLiteralExpression
): any {
  let buildStateValue: any;
  objectLiteral.properties
    .filter(ts.isPropertyAssignment)
    .filter(property => property.name.getText() === "state")
    .map(propertyAssignment => {
      const initializer = propertyAssignment.initializer;
      if (ts.isObjectLiteralExpression(initializer)) {
        buildStateValue = buildStateFromObjectLiteral(initializer);
      }
    });
  return buildStateValue;
}

function getReducerTypeOfDvaModel(
  objectLiteral: ts.ObjectLiteralExpression
): any {
  let buildReducersValue: any;
  objectLiteral.properties
    .filter(ts.isPropertyAssignment)
    .filter(property => property.name.getText() === "reducers")
    .map(propertyAssignment => {
      const initializer = propertyAssignment.initializer;
      if (ts.isObjectLiteralExpression(initializer)) {
        buildReducersValue = buildReducersFromObjectLiteral(initializer);
      }
    });
  return buildReducersValue;
}

function getEffectTypeOfDvaModel(
  objectLiteral: ts.ObjectLiteralExpression
): any {
  let buildEffectsValue: any;
  objectLiteral.properties
    .filter(ts.isPropertyAssignment)
    .filter(property => property.name.getText() === "effects")
    .map(propertyAssignment => {
      const initializer = propertyAssignment.initializer;
      // console.log(initializer);
      if (ts.isObjectLiteralExpression(initializer)) {
        buildEffectsValue = buildEffectFromObjectLiteral(initializer);
      }
    });
  return buildEffectsValue;
}

function buildReducersFromObjectLiteral(
  initializer: ts.ObjectLiteralExpression
) {
  const members = initializer.properties
    .filter(ts.isMethodDeclaration)
    .map(item => {
      return ts.createPropertySignature(
        undefined,
        ts.createIdentifier(item.name.getText()),
        undefined,
        ts.createTypeReferenceNode(ts.createIdentifier("Reducer"), [
          ts.createTypeReferenceNode(
            ts.createIdentifier(STATE_TYPE_NAME),
            undefined
          )
        ]),
        undefined
      );
    });
  return ts.createTypeLiteralNode(members);
}

function buildEffectFromObjectLiteral(initializer: ts.ObjectLiteralExpression) {
  const members = initializer.properties
    .filter(ts.isMethodDeclaration)
    .map(item => {
      return ts.createPropertySignature(
        undefined,
        ts.createIdentifier(item.name.getText()),
        undefined,
        ts.createTypeReferenceNode(ts.createIdentifier("Effect"), undefined),
        undefined
      );
    });
  return ts.createTypeLiteralNode(members);
}

function buildStateFromObjectLiteral(initializer: ts.ObjectLiteralExpression) {
  const members = initializer.properties
    .filter(ts.isPropertyAssignment)
    .map(item => {
      const keyWord = item.getChildren()[2].getText();
      const typeNode = helpers.getTypeNode(keyWord, keyWord, false);
      return ts.createPropertySignature(
        undefined,
        ts.createIdentifier(item.name.getText()),
        undefined,
        typeNode,
        undefined
      );
    });
  return ts.createTypeLiteralNode(members);
}
export function getNameSpaceFromPropTypeObjectLiteral(
  objectLiteral: ts.ObjectLiteralExpression
) {
  let namespaceValue = "";
  objectLiteral.properties
    .filter(ts.isPropertyAssignment)
    .map(propertyAssignment => {
      const name = propertyAssignment.name.getText();
      const initializer = propertyAssignment.initializer;
      if (name === "namespace") {
        namespaceValue = initializer.getText();
      }
    });
  namespaceValue =
    namespaceValue.slice(0, 2).toUpperCase() + namespaceValue.substr(2);
  return namespaceValue.substr(1, namespaceValue.length - 2);
}
