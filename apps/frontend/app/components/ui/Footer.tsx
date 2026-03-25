import { getCurrentYear } from "@/app/lib/utils";
import BrandIcon from "./BrandIcon";

export default function Footer() {
  return (
    <footer className="bg-[#cbffda]/30 text-primary">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-col-reverse tect-center lg:text-left">
          <ul className="text-primary/60 flex flex-col gap-2 lg:flex-row lg:gap-4 lg:justify-end">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
            <li>
              <a href="#">Cookie Settings</a>
            </li>
          </ul>
          <div className="space-y-4">
            <div className="max-w-2xl">
              <BrandIcon />
              <p className="opacity-70 mt-4">
                Empowering the Nigerian Student with better housing and premium
                living.
              </p>
            </div>
            <div className="flex gap-4 text-primary/60 justify-between">
              <p>
                Made for every student in{" "}
                <span className="text-primary">Nigeria</span>
              </p>
              <p>@{getCurrentYear()} Hostel Marketplace App</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
