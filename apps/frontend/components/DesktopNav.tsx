import Link from "next/link";
import BrandIcon from "./ui/BrandIcon";
import NavLink from "./ui/NavLink";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex mx-auto max-w-7xl justify-between px-4 py-4 items-center">
      <BrandIcon />
      <div className="flex gap-4">
        <NavLink href="#" label="Find Hostels" />
        <NavLink href="#" label="How it works" />
        <NavLink href="#" label="Support" />
      </div>

      <div className="flex gap-2">
        <Link className="text-primary py-2.5 px-6" href="/auth/signin">
          Sign In
        </Link>
        <Link
          className="text-white bg-primary py-2.5 px-6 rounded-xl"
          href="/auth/signup"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
