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
