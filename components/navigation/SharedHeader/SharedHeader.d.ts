import { CSSProperties } from "react";

export interface SharedHeaderProps {
  /** Which nav item to render active: "intro" | "guide" | "my". */
  active?: string;
  style?: CSSProperties;
}

export function SharedHeader(props: SharedHeaderProps): JSX.Element;
