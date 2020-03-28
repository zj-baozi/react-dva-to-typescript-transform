import * as React from "react";
type MyComponentStateType = { foo: number };
export default class MyComponent extends React.Component<
  {},
  MyComponentStateType
> {
  constructor(props, context) {
    super(props, context);
    this.state = { foo: 1 };
  }
  render() {
    return <div />;
  }
}
