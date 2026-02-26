import { FaSearch } from "react-icons/fa";

export default function LandingSearch() {
  return (
    <div className="text-xl px-8 py-4 w-120 flex items-center gap-4 ring ring-gray-900/40 rounded-full text-gray-900/40">
      <input type="text" className="w-full" placeholder="Start searching" />
      <FaSearch className="cursor-pointer relative hover:text-gray-900/60 transition ease-out" />
    </div>
  );
}
