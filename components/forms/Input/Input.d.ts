import { CSSProperties, ChangeEventHandler } from "react";

export interface InputProps {
  type?: "text" | "area" | "select" | "search" | "password" | "check" | "check-on" | "radio" | "radio-on" | "toggle" | "toggle-on";
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** For check/radio/toggle: controlled checked state (variant suffix "-on" also forces it on). */
  checked?: boolean;
  /** Reserved for future select-with-options support. */
  options?: string[];
  style?: CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
