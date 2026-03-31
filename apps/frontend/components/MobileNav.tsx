import { RxHamburgerMenu } from "react-icons/rx";
import BrandIcon from "@/components/ui/BrandIcon";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

export default function MobileNav() {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive((prev) => !prev);
  };
  return (
    <div className="flex lg:hidden p-8 justify-between">
      <BrandIcon />
      <RxHamburgerMenu size={20} className="cursor-pointer" onClick={toggleNav} />

      {navActive && (
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between w-full">
            <BrandIcon />
            <FaX className="cursor-pointer" onClick={toggleNav} />
          </div>
        </div>
      )}
    </div>
  );
}
