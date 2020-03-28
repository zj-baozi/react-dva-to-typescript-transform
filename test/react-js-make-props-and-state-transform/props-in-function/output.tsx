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
