import * as React from "react";
type MyComponentPropsType = {
  foo: string;
};
export default class MyComponent extends React.Component<
  MyComponentPropsType,
  {}
> {
  static get propTypes() {
    return {
      foo: React.PropTypes.string.isRequired
    };
  }
  render() {
    return <div />;
  }
}
