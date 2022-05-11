export type Image = string | HTMLImageElement | Buffer;

export type Props = {
  onError?: (err: Object) => void;
  getColors: (colors: Array<any>) => any;
  hsl?: boolean;
  src?: string;
  maxColors?: number;
  children?: JSX.Element;
};
