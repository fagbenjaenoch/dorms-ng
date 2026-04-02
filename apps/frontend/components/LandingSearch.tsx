import { FiArrowRight } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "./ui/button";

export default function LandingSearch() {
  return (
    <div className="shadow-lg ring-1 ring-gray-500/5 p-4 lg:p-2 gap-4 max-w-3xl flex flex-col lg:flex-row lg:items-center rounded-2xl">
      <div className="w-full px-4 py-4 flex items-center gap-3 bg-background rounded-xl">
        <HiLocationMarker size={20} className="text-primary" />
        <input
          className=" text-gray-900 w-full focus:outline-none"
          placeholder="Which University or City?"
        />
      </div>

      <Button
        variant="secondary"
        className="text-primary-foreground text-base flex justify-center lg:justify-normal items-center gap-2 rounded-2xl py-4 px-8 cursor-pointer h-auto"
      >
        Search Now <FiArrowRight />
      </Button>
    </div>
  );
}
