import { ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
type Props = ComponentProps<"button"> & { variant?: "primary" | "dark" };
export function Button({ children, variant = "primary", className = "", ...props }: Props) {
  return <button className={`button button--${variant} ${className}`} {...props}>{children}<ChevronRight size={16} aria-hidden="true" /></button>;
}
export function ButtonLink({ children, className = "", ...props }: ComponentProps<"a">) {
  return <a className={`button button--primary ${className}`} {...props}>{children}<ChevronRight size={16} aria-hidden="true" /></a>;
}
