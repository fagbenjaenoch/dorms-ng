import { SearchResult } from "@/lib/dto";
import useRecentSearches from "@/lib/hooks/useRecentSearches";
import { searchQueryParam } from "@/lib/utils";
import { EntityTypeToIcon } from "@/lib/utils/search";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

interface LandingSearchResultProps {
  searchResult: SearchResult;
  searchTerm: string;
}

export default function LandingSearchResult({
  searchResult,
  searchTerm,
}: LandingSearchResultProps) {
  const { addSearch } = useRecentSearches();

  return (
    <Link
      className="group cursor-pointer hover:bg-gray-500/10 p-2 md:p-4 rounded-md flex items-center gap-2"
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
          <span className="text-muted-foreground line-clamp-2">
            {searchResult.address}
          </span>
        </div>
      </div>
      <ChevronRight
        className="shrink-0 text-primary ml-auto group-hover:translate-x-1 transition-all"
        size={15}
      />
    </Link>
  );
}
