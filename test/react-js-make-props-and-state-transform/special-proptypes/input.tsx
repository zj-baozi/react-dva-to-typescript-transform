import React, { PureComponent } from "@alipay/bigfish/react";

const { Ali } = window;

export default class App extends PureComponent {
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
