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
type AnotherComponentPropsType = {
  foo: string;
};
export class AnotherComponent extends React.Component<
  AnotherComponentPropsType,
  {}
> {
  static propTypes = {
    foo: React.PropTypes.string.isRequired
  };
  render() {
    return <div />;
  }
}
