import React, { PureComponent } from "@alipay/bigfish/react";
const { Ali } = window;
type AppPropsType = {
  testaaaa: any;
};
type AppStateType = { aa: string; bb: boolean };
export default class App extends PureComponent<AppPropsType, AppStateType> {
  constructor(props) {
    super(props);
    this.state = {
      aa: "",
      bb: false
    };
  }
  render() {
    const {
      testaaaa: { title }
    } = this.props;
    Ali.ready(() => {
      if (Ali.isAlipay) {
        Ali.setNavigationBar({
          title
        });
      }
    });
    return <div>朋友</div>;
  }
}
