import React, { PureComponent } from "react";
import { connect } from "dva";
type PayStateType = {
  payeeAssetId: string;
};
@connect(({ collection }) => ({ collection }))
export default class Pay extends PureComponent<{}, PayStateType> {
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
