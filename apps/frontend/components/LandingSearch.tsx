"use client";

import { FiArrowRight } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const queryKey = "q";

export default function LandingSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      params.set(queryKey, e.target.value);
    } else {
      params.delete(queryKey);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="shadow-lg ring-1 ring-gray-500/5 p-4 lg:p-2 gap-4 max-w-3xl flex flex-col lg:flex-row lg:items-center rounded-2xl">
      <div className="w-full px-4 py-4 flex items-center gap-3 bg-background rounded-xl">
        <HiLocationMarker size={20} className="text-primary" />
        <search>
          <input
            className=" text-gray-900 w-full focus:outline-none"
            placeholder="Which University or City?"
            onChange={handleChange}
          />
        </search>
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
