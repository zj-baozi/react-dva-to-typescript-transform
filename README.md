# React Or Dva from JavaScript to TypeScript Transform

Converts React Or Dva code written in JavaScript to TypeScript. Developed based on popular library react-javascript-to-typescript-transform with a few feature customized.

基于 react-javascript-to-typescript-transform 开发，
增加 dva 语法的转换，优先考虑转换后代码的兼容性，减少手动修正的代码量，以实现快速迁移 TS。

详见示例

## Features:

- Proxies `PropTypes` to `React.Component` or `PureComponent` generic type and removes PropTypes
- Provides state typing for `React.Component` or `PureComponent` based on initial state， `setState()` calls and `this.state` in the component
- Hoist large interfaces for props and state out of `React.Component<P, S>` into declared types
- Convert functional components with `PropTypes` property to TypeScript and uses propTypes to generate function type declaration
- Convert Dva model code written in Javascript to Typescript
- Convert Dva connect code written in Javascript to Typescript

## Example

**input**

```jsx
import * as React from "react";

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  noticeClick() {
    const { dispatch } = this.props;
    dispatch({ type: "notice/click" });
  }

  render() {
    const { notice, route } = this.props;
    return <div />;
  }
}
```

**output**

```tsx
import * as React from "react";
type MyComponentPropsType = {
  notice: any;
  route: any;
  dispatch: any;
};
export default class MyComponent extends React.Component<
  MyComponentPropsType,
  {}
> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  noticeClick() {
    const { dispatch } = this.props;
    dispatch({ type: "notice/click" });
  }
  render() {
    const { notice, route } = this.props;
    return <div />;
  }
}
```

**input**

```jsx
export default {
  namespace: "collection",
  state: {
    limitIncreaseAmount: null,
    maxLevel: false,
    amount: ""
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init(_, { call, put }) {
      return true;
    }
  }
};
```

**output**

```tsx
import { Effect } from "dva";
import { Reducer } from "redux";
type CollectionStateType = {
  limitIncreaseAmount: null;
  maxLevel: boolean;
  amount: string;
};
type CollectionModelType = {
  namespace: string;
  state: CollectionStateType;
  effects: {
    init: Effect;
  };
  reducers: {
    setState: Reducer<CollectionStateType>;
  };
};
const Models: CollectionModelType = {
  namespace: "collection",
  state: {
    limitIncreaseAmount: null,
    maxLevel: false,
    amount: ""
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *init(_, { call, put }) {
      return true;
    }
  }
};
export default Models;
```

## Usage

### Install

```
npm install -g react-dva-to-typescript-transform
```

### CLI

```
dva-to-ts "./src/**/*.js"
```

or

```
dva-to-ts "./src/**/*.js" --keep-original-files --single-quote
```

## Development

### Tests

Tests are organized in `test` folder. For each transform there is a folder that contains folders for each test case. Each test case has `input.tsx` and `output.tsx`.

```
npm test
```
