import * as React from "react";
type MyComponentPropsType = {
  notice: any;
  route: any;
  any?: any;
  array?: any[];
  bool?: boolean;
  func?: (...args: any[]) => any;
  number?: number;
  object?: object;
};
export default class MyComponent extends React.Component<
  MyComponentPropsType,
  {}
> {
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
