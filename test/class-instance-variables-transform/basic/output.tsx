import * as React from "react";
import { PureComponent } from "react";
export default class MyComponent extends PureComponent {
  a: string;
  b: string;
  c: number;
  fetch: () => void;
  ref: HTMLDivElement;
  stateMap: any;
  constructor(props) {
    super(props);
    this.a = "";
    this.b = "2";
    this.c = 1;
  }
  componentDidMount() {
    this.fetch = () => {};
    const rowstate = this.stateMap[id];
  }
  render() {
    return <div ref={ref => (this.ref = ref)} />;
  }
}
