import BrandIcon from "./ui/BrandIcon";
import NavLink from "./ui/NavLink";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex justify-between px-8 py-4 item-center">
      <BrandIcon />
      <div className="flex gap-4">
        <NavLink href="#" label="Find Hostels" />
        <NavLink href="#" label="How it works" />
        <NavLink href="#" label="Support" />
      </div>

      <div className="flex gap-2">
        <a className="text-primary py-2.5 px-6" href="#">
          Sign In
        </a>
        <a className="text-white bg-primary py-2.5 px-6 rounded-xl" href="#">
          Sign Up
        </a>
      </div>
    </div>
  );
}
