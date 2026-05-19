"use client";

import { search } from "@/lib/api/search";
import { APIResponse, SearchResult } from "@/lib/dto";
import useDebounce from "@/lib/hooks/useDebounce";
import { searchQueryParam } from "@/lib/utils";
import { EntityTypeToIcon } from "@/lib/utils/search";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";

export default function Search() {
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
    <div className="relative hidden xl:block ">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
        size={16}
      />
      <input
        className="border border-gray-300/50 pl-10 pr-4 py-2 rounded-full text-sm w-64"
        placeholder="Search hostels..."
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />

      {searchTerm.length > 0 && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
        >
          <X size={12} />
        </button>
      )}

      {!!query.data?.payload?.length && (
        <div className="absolute top-full mt-3 left-0 w-full flex flex-col gap-2 bg-primary-foreground shadow-lg ring-1 ring-gray-500/5 p-2 rounded-xl">
          {query.data.payload.map((searchResult) => (
            <Link
              className="group cursor-pointer hover:bg-gray-500/10 p-2 rounded-md flex items-center gap-2"
              href={`/${searchResult.entity_type}s/${searchResult.slug}`}
              key={searchResult.entity_id}
            >
              <div className="flex items-center gap-3 text-sm">
                {EntityTypeToIcon[searchResult.entity_type + "_sm"]}
                <div className="flex flex-col">
                  <span className="font-semibold">{searchResult.entity}</span>
                  <span className="text-muted-foreground line-clamp-2">
                    {searchResult.address}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
