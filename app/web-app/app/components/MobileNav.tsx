import { RxHamburgerMenu } from "react-icons/rx";
import BrandIcon from "@/app/components/ui/BrandIcon";

export default function MobileNav() {
  return (
    <div className="flex lg:hidden p-8 justify-between">
      <BrandIcon />
      <RxHamburgerMenu size={20} className="cursor-pointer" />
    </div>
  );
}
