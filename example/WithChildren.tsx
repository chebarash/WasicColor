import React from "react";
import { WasicColor } from "../dist";

import { IMAGE, IMAGE_STYLES, Swatches, renderSwatches } from "./utils";

export class WithChildren extends React.Component {
  state = { colors: [] };

  getColors = (colors: any[]) => this.setState(() => ({ colors }));

  render() {
    return (
      <React.Fragment>
        <WasicColor getColors={this.getColors}>
          <img src={IMAGE} style={IMAGE_STYLES} />
        </WasicColor>
        <Swatches colors={this.state.colors} renderSwatches={renderSwatches} />
      </React.Fragment>
    );
  }
}
