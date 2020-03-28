import * as React from "react";
type MyComponentPropsType = {
  baz: string;
  bae: string;
};
type MyComponentStateType = {
  foo: number;
  bar: string;
};
export default class MyComponent extends React.Component<
  MyComponentPropsType,
  MyComponentStateType
> {
  state = { foo: 1, bar: "str" };
  render() {
    return <div />;
  }
}
