import { CSSProperties } from "react";

export interface SharedSidebarProps {
  /** Which nav item to render active: "upload" | "result" | "share" | "my" | "policy". */
  active?: string;
  style?: CSSProperties;
}

export function SharedSidebar(props: SharedSidebarProps): JSX.Element;
