import * as React from "react";
type MyComponentStateType = { foo: number; bar: number };
export default class MyComponent extends React.Component<
  {},
  MyComponentStateType
> {
  render() {
    return <button onClick={this.onclick.bind(this)} />;
  }
  onclick() {
    this.setState({ foo: 1, bar: 2 });
  }
}
