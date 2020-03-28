import React, { PureComponent } from "react";
import { connect } from "dva";
@connect(({ collection }) => ({ collection }))
export default class Pay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      payeeAssetId: ""
    };
  }

  render() {
    return <div></div>;
  }
}
