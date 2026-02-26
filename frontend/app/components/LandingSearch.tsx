import { FaSearch } from "react-icons/fa";

export default function LandingSearch() {
  return (
    <div className="text-xl px-8 py-4 w-120 flex items-center gap-4 ring ring-gray-900/40 rounded-full text-gray-900/40">
      <FaSearch />
      <input type="text" placeholder="Start searching" />
    </div>
  );
}
