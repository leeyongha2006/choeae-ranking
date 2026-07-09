import { ReactNode, CSSProperties, MouseEventHandler } from "react";

export interface ButtonProps {
  /** Which of the 7 wireframe variants to render. */
  variant?: "primary" | "secondary" | "danger" | "default" | "chip";
  size?: "sm" | "md" | "lg";
  /** Optional leading icon/emoji node. */
  icon?: ReactNode;
  disabled?: boolean;
  /** Renders "default-active" or "chip-active" skin for the default/chip variants. */
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
