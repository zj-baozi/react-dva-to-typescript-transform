import * as React from "react";

export default class MyComponent extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    any: React.PropTypes.any,
    array: React.PropTypes.array,
    bool: React.PropTypes.bool,
    func: React.PropTypes.func,
    number: React.PropTypes.number,
    object: React.PropTypes.object
  };
  noticeClick() {
    // 公告信息初始化
    const {
      route: { title }
    } = this.props;
  }

  render() {
    const { notice, route } = this.props;
    return <div />;
  }
}
