"use client";

import { FiArrowRight } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "./ui/button";
import useDebounce from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, X } from "lucide-react";
import { cn, searchQueryParam } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { APIResponse, SearchResult } from "@/lib/dto";
import Link from "next/link";
import { search } from "@/lib/api/search";
import { EntityTypeToIcon } from "@/lib/utils/search";

export default function LandingSearch() {
  const [searchTerm, setSearchTerm] = useQueryState(searchQueryParam, {
    defaultValue: "",
  });

  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const query = useQuery<APIResponse<SearchResult[]>>({
    queryKey: ["search", debounceSearchTerm],
    queryFn: ({ signal }) => search(debounceSearchTerm, { signal }),
    enabled: debounceSearchTerm?.length > 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm(null);
  };

  return (
    <div className="relative shadow-lg ring-1 ring-gray-500/5 p-4 lg:p-2 gap-4 max-w-3xl flex flex-col lg:flex-row lg:items-center rounded-2xl">
      <div className="w-full px-4 flex items-center gap-3 bg-background rounded-xl">
        <HiLocationMarker size={20} className="text-primary" />
        <search className="w-full flex items-center">
          <input
            name="landing-search"
            className=" text-gray-900 focus:outline-none w-full"
            placeholder="Which University or City are you looking for?"
            onChange={handleChange}
            value={searchTerm}
          />
          <Button
            variant="ghost"
            className={cn(
              "hidden hover:text-primary-background",
              `${searchTerm?.length && "block"}`,
            )}
            onClick={clearSearch}
          >
            <X />
          </Button>
        </search>
      </div>

      <Button
        variant="secondary"
        className="group text-primary-foreground text-base flex justify-center lg:justify-normal items-center gap-2 rounded-2xl py-4 px-8 cursor-pointer h-auto"
      >
        Search Now{" "}
        <FiArrowRight className="group-hover:translate-x-1 transition-all" />
      </Button>

      {!!query.data?.payload?.length && (
        <div className="absolute z-50 top-full mt-3 left-0 w-full flex flex-col gap-2 bg-primary-foreground shadow-lg ring-1 ring-gray-500/5 p-2 rounded-xl">
          {query.data.payload.map((searchResult) => (
            <Link
              className="group cursor-pointer hover:bg-gray-500/10 p-4 rounded-md flex items-center gap-2"
              href={
                searchResult.entity_type === "neighborhood"
                  ? `/search?${searchQueryParam}=${searchResult.entity}`
                  : `/${searchResult.entity_type}s/${searchResult.slug}`
              }
              key={searchResult.entity_id}
            >
              <div className="flex items-center gap-4">
                {EntityTypeToIcon[searchResult.entity_type]}
                <div className="flex flex-col">
                  <span className="font-semibold">{searchResult.entity}</span>
                  <span className="text-muted-foreground">
                    {searchResult.address}
                  </span>
                </div>
              </div>
              <ChevronRight
                className="text-primary ml-auto group-hover:translate-x-1 transition-all"
                size={15}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
