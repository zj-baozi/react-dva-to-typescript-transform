import * as React from "react";
type MyComponentPropsType = {
  foo: string;
};
export default class MyComponent extends React.Component<
  MyComponentPropsType,
  {}
> {
  static propTypes = {
    foo: React.PropTypes.string.isRequired
  };
  render() {
    return <div />;
  }
}
