import { HTMLAttributes } from "react";

export default function BrandIcon({ ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="font-black tracking-tighter block" {...props}>
      Dorms<span className="text-orange-500">.ng</span>
    </span>
  );
}
