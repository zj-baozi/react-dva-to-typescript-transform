import * as ts from "typescript";
import * as prettier from "prettier";

import {
  compile,
  CompilationOptions,
  DEFAULT_COMPILATION_OPTIONS
} from "./compiler";
import { classInstanceVariablesTransformFactoryFactory } from "./transforms/class-instance-variables-transform";
import { reactJSMakePropsAndStateInterfaceTransformFactoryFactory } from "./transforms/react-js-make-props-and-state-transform";
import { reactRemovePropTypesAssignmentTransformFactoryFactory } from "./transforms/react-remove-prop-types-assignment-transform";
import { reactMovePropTypesToClassTransformFactoryFactory } from "./transforms/react-move-prop-types-to-class-transform";
import { collapseIntersectionInterfacesTransformFactoryFactory } from "./transforms/collapse-intersection-interfaces-transform";
import { reactRemoveStaticPropTypesMemberTransformFactoryFactory } from "./transforms/react-remove-static-prop-types-member-transform";
import { reactStatelessFunctionMakePropsTransformFactoryFactory } from "./transforms/react-stateless-function-make-props-transform";
import { reactRemovePropTypesImportTransformFactoryFactory } from "./transforms/react-remove-prop-types-import";

import { dvaConnectTransformFactory } from "./transforms/dva-connect-transform";
import { dvaModelTransformFactoryFactory } from "./transforms/dva-model-transform";

export {
  classInstanceVariablesTransformFactoryFactory,
  reactMovePropTypesToClassTransformFactoryFactory,
  reactJSMakePropsAndStateInterfaceTransformFactoryFactory,
  reactStatelessFunctionMakePropsTransformFactoryFactory,
  collapseIntersectionInterfacesTransformFactoryFactory,
  reactRemovePropTypesAssignmentTransformFactoryFactory,
  reactRemoveStaticPropTypesMemberTransformFactoryFactory,
  reactRemovePropTypesImportTransformFactoryFactory,
  compile,
  dvaConnectTransformFactory,
  dvaModelTransformFactoryFactory
};

export const allTransforms = [
  reactMovePropTypesToClassTransformFactoryFactory,
  reactJSMakePropsAndStateInterfaceTransformFactoryFactory,
  reactStatelessFunctionMakePropsTransformFactoryFactory,
  reactRemovePropTypesAssignmentTransformFactoryFactory,
  reactRemoveStaticPropTypesMemberTransformFactoryFactory,
  reactRemovePropTypesImportTransformFactoryFactory,
  classInstanceVariablesTransformFactoryFactory,
  collapseIntersectionInterfacesTransformFactoryFactory,
  dvaConnectTransformFactory,
  dvaModelTransformFactoryFactory
];

export type TransformFactoryFactory = (
  typeChecker: ts.TypeChecker
) => ts.TransformerFactory<ts.SourceFile>;

/**
 * Run React JavaScript to TypeScript transform for file at `filePath`
 * @param filePath
 */
export function run(
  filePath: string,
  prettierOptions: prettier.Options = {},
  compilationOptions: CompilationOptions = DEFAULT_COMPILATION_OPTIONS
): string {
  return compile(filePath, allTransforms, prettierOptions, compilationOptions);
}
