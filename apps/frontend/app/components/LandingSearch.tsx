import { FaSearch } from "react-icons/fa";

export default function LandingSearch() {
  return (
    <div className="relative text-xl px-8 py-4 w-120 lg:w-160 flex items-center gap-4 ring ring-gray-900/40 rounded-full text-gray-900/40">
      <input
        type="text"
        className="w-full mr-8"
        placeholder="Search for hostels, universities or locations"
      />
      <button className="absolute top-1 right-2 group hover:bg-gray-500/20 p-4 rounded-full cursor-pointer">
        <FaSearch className="relative group-hover:text-gray-900/60 transition ease-out" />
      </button>
    </div>
  );
}
