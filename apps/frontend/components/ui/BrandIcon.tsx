import { HTMLAttributes } from "react";

export default function BrandIcon({ ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="font-black tracking-tighter block" {...props}>
      Hostel<span className="text-orange-500">.ng</span>
    </span>
  );
}
