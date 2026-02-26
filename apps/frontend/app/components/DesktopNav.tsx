import BrandIcon from "./ui/BrandIcon";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex justify-between p-8">
      <div className="flex gap-4">
        <BrandIcon />
      </div>
      <a href="#">Sign In</a>
    </div>
  );
}
