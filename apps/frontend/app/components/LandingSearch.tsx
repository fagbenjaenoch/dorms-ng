import { BiChevronDown } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { MdApartment } from "react-icons/md";

export default function LandingSearch() {
  return (
    <div className="shadow-xl p-4 gap-4 lg:w-fit max-w-3xl flex flex-col lg:flex-row lg:items-center rounded-2xl">
      <div className="px-4 py-4 flex items-center gap-3 bg-foreground rounded-xl">
        <HiLocationMarker size={20} className="text-primary" />
        <input
          className=" text-gray-900/60"
          placeholder="Which University or City?"
        />
      </div>
      <div className="px-4 py-4 flex gap-3 bg-foreground rounded-xl">
        <MdApartment className="text-primary" size={20} />
        <span className="flex gap-2">
          Self Contain <BiChevronDown size={20} />
        </span>
      </div>
      <button className="bg-secondary text-white flex justify-center lg:justify-normal items-center gap-2 rounded-2xl py-4 px-8 cursor-pointer">
        Search Now <FiArrowRight />
      </button>
    </div>
  );
}
