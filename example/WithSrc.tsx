import React from "react";
import { WasicColor } from "../dist";

import { IMAGE, Swatches, renderSwatches } from "./utils";

export class WithSource extends React.Component {
  state = { colors: [] };

  getColors = (colors: any[]) => this.setState(() => ({ colors }));

  render() {
    return (
      <React.Fragment>
        <WasicColor src={IMAGE} getColors={this.getColors} />
        <Swatches colors={this.state.colors} renderSwatches={renderSwatches} />
      </React.Fragment>
    );
  }
}
