import { HTMLAttributes } from "react";

export default function BrandIcon({
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "orange" }) {
  return (
    <span className="font-black tracking-tighter block" {...props}>
      Dorms
      <span className={variant === "default" ? "text-primary" : "text-orange-500"}>
        .ng
      </span>
    </span>
  );
}
