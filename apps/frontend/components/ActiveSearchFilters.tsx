import { X, LucideListFilter } from "lucide-react";
import { Button } from "./ui/button";

function FilterItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border shrink-0">
      <span className="text-sm font-medium">{children}</span>
      <button className="hover:text-error transition-colors flex items-center">
        <X size={13} />
      </button>
    </div>
  );
}

export default function ActiveSearchFilters() {
  return (
    <div className="bg-white sticky top-0 left-0 w-full z-40 shadow-sm border-b py-4 px-8 transition-all duration-300 ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4  mx-auto max-w-7xl">
        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <span className="text-sm font-bold uppercase tracking-widest shrink-0">
            Active Filters:
          </span>

          <FilterItem>Price: &lt; ₦500k</FilterItem>
          <FilterItem>Self-Contain</FilterItem>
          <FilterItem>&lt; 2km from Campus</FilterItem>
        </div>
      </div>
    </div>
  );
}
