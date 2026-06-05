"use client";

import posthog from "posthog-js";
import { Button } from "./ui/button";
import useDebounce from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Search, X } from "lucide-react";
import { searchQueryParam } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { APIResponse, SearchResult } from "@/lib/dto";
import Link from "next/link";
import { search } from "@/lib/api/search";
import { EntityTypeToIcon } from "@/lib/utils/search";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import LandingSearchDropdown from "./LandingSearchDropdown";
import { useState } from "react";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import useRecentSearches from "@/lib/hooks/useRecentSearches";

export default function LandingSearch() {
  const ref = useClickOutside<HTMLInputElement>(() => setShowDropdown(false));
  const [searchTerm, setSearchTerm] = useQueryState(searchQueryParam, {
    defaultValue: "",
  });
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const [showDropdown, setShowDropdown] = useState(false);
  const { addSearch } = useRecentSearches();

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
    <div className="relative" ref={ref}>
      <InputGroup size="xl" className="shadow-md">
        <InputGroupInput
          placeholder="Which hostel, university or city are you looking for?"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
        />
        <InputGroupAddon size="xl">
          <Search size={20} className="text-primary" />
        </InputGroupAddon>
        {searchTerm.length > 0 && (
          <InputGroupAddon align="inline-end">
            <Button variant="ghost" onClick={clearSearch}>
              <X />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>

      {showDropdown && !query.data ? (
        <LandingSearchDropdown />
      ) : !!query.data?.payload?.length ? (
        <div className="absolute z-50 top-full mt-3 left-0 w-full flex flex-col gap-2 bg-primary-foreground shadow-lg ring-1 ring-gray-500/5 p-2 rounded-xl">
          {query.data.payload.map((searchResult) => (
            <Link
              className="group cursor-pointer hover:bg-gray-500/10 p-4 rounded-md flex items-center gap-2"
              href={
                searchResult.entity_type === "neighborhood"
                  ? `/search?${searchQueryParam}=${searchResult.entity}`
                  : `/${searchResult.entity_type}s/${searchResult.slug}`
              }
              onClick={() => {
                addSearch(searchTerm);
                posthog.capture("search_result_clicked", {
                  search_term: searchTerm,
                  result_type: searchResult.entity_type,
                  result_name: searchResult.entity,
                });
              }}
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
      ) : (
        <div className="absolute z-50 top-full mt-3 left-0 w-full bg-primary-foreground shadow-lg ring-1 ring-gray-500/5 p-4 rounded-xl text-muted-foreground">
          No matches found
        </div>
      )}
    </div>
  );
}
