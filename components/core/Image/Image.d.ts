import { CSSProperties } from "react";

export interface ImageProps {
  shape?: "round" | "square";
  /** Pixel size, both dimensions. Default 64. */
  size?: number;
  /** Placeholder initials/glyph shown in the fill (default "친"). */
  initials?: string;
  style?: CSSProperties;
}

export function Image(props: ImageProps): JSX.Element;
