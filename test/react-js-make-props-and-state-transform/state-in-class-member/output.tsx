import * as React from "react";
type MyComponentStateType = { foo: number };
export default class MyComponent extends React.Component<
  {},
  MyComponentStateType
> {
  state = { foo: 1 };
  render() {
    return <div />;
  }
}
