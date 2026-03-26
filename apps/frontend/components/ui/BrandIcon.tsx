import { HTMLAttributes } from "react";

export default function BrandIcon({ ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="font-sans text-primary font-bold" {...props}>
      🏠 Hostel.ng
    </span>
  );
}
