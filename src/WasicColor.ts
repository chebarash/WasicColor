import Vibrant from "node-vibrant";
import { Children, Component, ReactNode } from "react";

import type { Image, Props } from "./types";

class WasicColor extends Component<Props> {
  static defaultProps = {
    onError: (error: Object) => {},
    getColors: (colors: Array<Array<number> | string>) => {},
    rgb: false,
    hex: true,
    src: null,
    maxColors: 64,
  };

  componentDidMount() {
    this.processImage();
  }

  componentDidUpdate(props: Props) {
    if (
      props.src !== this.props.src &&
      typeof this.props.src === "string" &&
      this.props.src.length > 0
    ) {
      this.parseImage(this.props.src, this.props);
    } else if (
      this.props.children &&
      props.children?.props.src !== this.props.children.props.src
    ) {
      this.parseImage(this.props.children.props.src, this.props);
    }
  }

  processImage = () => {
    if (this.props.children) {
      if (this.props.children.props.src) {
        this.parseImage(this.props.children.props.src, this.props);
      }
    } else if (
      this.props.src &&
      typeof this.props.src === "string" &&
      this.props.src.length > 0
    ) {
      this.parseImage(this.props.src, this.props);
    } else {
      console.error(
        "Please provide an image url using the 'src' prop or wrap an image element under the <ColorExtractor /> component. Check out the docs for more info - https://goo.gl/rMZ5L7"
      );
    }
  };

  parseImage = (image: Image, props: Props) => {
    Vibrant.from(image)
      .maxColorCount(props.maxColors || 5)
      .getSwatches()
      .then((swatches) => {
        const colors = [];

        for (let swatch in swatches) {
          if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
            if (props.hsl) {
              colors.push(swatches[swatch]?.getHsl());
            } else {
              colors.push(swatches[swatch]?.getHex());
            }
          }
        }

        props.getColors(colors);
      });
  };

  render(): ReactNode {
    const length = Children.count(this.props.children);

    if (length > 1) {
      throw new Error("Expected only one image element.");
    } else if (length === 1) {
      if (this.props.children?.type === "img") {
        return this.props.children;
      } else {
        throw new Error(
          `Expected children to be an image element but instead got a "${this.props.children?.type}"`
        );
      }
    } else {
      return null;
    }
  }
}

export default WasicColor;
