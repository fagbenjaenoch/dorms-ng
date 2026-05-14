import { HTMLAttributes } from "react";

export default function BrandIcon({ ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className="font-sans text-primary font-extrabold tracking-tighter"
      {...props}
    >
      🏠 Hostel.ng
    </span>
  );
}
