import { getCurrentYear } from "@/app/lib/utils";
import BrandIcon from "./BrandIcon";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-col-reverse tect-center lg:text-left">
          <ul className="text-gray-500/60 flex flex-col gap-2 lg:flex-row lg:gap-4 lg:justify-end">
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
              <p className="opacity-70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas porro
                cum eius maxime tenetur a laboriosam itaque aut nemo ipsum!
              </p>
            </div>
            <div className="flex justify-center gap-4 text-gray-500/60 lg:justify-between">
              <p>
                Made by <span className="text-gray-500">Enoch</span>
              </p>
              <p>@{getCurrentYear()} Hostel Marketplace App</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
