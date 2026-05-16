"use client";

import ActiveSearchFilters from "@/components/ActiveSearchFilters";
import HostelResults from "@/components/HostelResults";
import HostelResultsError from "@/components/HostelResultsError";
import LocationSearch from "@/components/LocationSearch";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import PropertyCardSkeleton from "@/components/ui/PropertyCardSkeleton";
import { placeSearch } from "@/lib/api/search";
import { APIResponse, Hostel, Place } from "@/lib/dto";
import useDebounce from "@/lib/hooks/useDebounce";
import { AreaTypeEnum, idParam, searchQueryParam, typeParam } from "@/lib/utils";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { LucideListFilter, MapPin } from "lucide-react";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useQueryState(searchQueryParam, {
    defaultValue: "",
  });
  const [areaType, setAreaType] = useQueryState(typeParam, {
    defaultValue: "",
  });
  const [areaId, setAreaId] = useQueryState(idParam, {
    defaultValue: "",
  });

  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const query = useQuery<APIResponse<Place[]>>({
    queryKey: ["placeSearch", debounceSearchTerm],
    queryFn: ({ signal }) => placeSearch(debounceSearchTerm, { signal }),
    enabled: debounceSearchTerm?.length > 0,
  });

  const clearSearch = () => {
    setSearchTerm(null);
  };

  const handleSearchResultClick = (type: string, id: string) => {
    setAreaType(type);
    setAreaId(id);
  };

  return (
    <div className="bg-gray-100">
      <hr className="bg-muted-foreground" />
      <ActiveSearchFilters />
      <main className="pt-12 pb-24 px-8 min-h-screen w-full mx-auto max-w-7xl">
        <div className="mb-20 flex justify-between items-end">
          <div className="w-full">
            <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter mb-10">
              Discover <span className="text-primary">places</span>
            </h1>
            <div className="flex items-center justify-between">
              <div className="relative">
                <LocationSearch
                  searchTerm={searchTerm}
                  handleChange={(e) => setSearchTerm(e.target.value)}
                  clearSearch={clearSearch}
                />
                {!!query.data?.payload?.length && (
                  <div className="absolute top-full mt-3 left-0 w-full flex flex-col gap-2 bg-primary-foreground shadow-lg ring-1 ring-gray-500/5 p-2 rounded-xl">
                    {query.data.payload.map((searchResult) => (
                      <div
                        className="cursor-pointer hover:bg-gray-500/10 p-2 rounded-md flex items-center gap-2 text-muted-foreground"
                        key={searchResult.place_id}
                        onClick={() =>
                          handleSearchResultClick(
                            searchResult.place_type,
                            searchResult.place_id,
                          )
                        }
                      >
                        <MapPin size={12} />
                        <span className="text-sm">{searchResult.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="ghost">
                <LucideListFilter />
                Filters
              </Button>
            </div>
            {searchTerm.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                Showing length results matching your criteria near{" "}
                <b>{searchTerm}</b>
              </p>
            )}
          </div>
        </div>
        {areaType.length > 0 ? (
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <HostelResultsError
                    error={error as Error}
                    resetErrorBoundary={resetErrorBoundary}
                  />
                )}
              >
                <Suspense
                  fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <PropertyCardSkeleton key={i} />
                      ))}
                    </div>
                  }
                >
                  <HostelResults
                    areaType={areaType as AreaTypeEnum}
                    areaId={areaId}
                  />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        ) : (
          <div className="flex flex-col items-center">
            <h2>Nothing to see here</h2>
            <p>Start typing in the search bar to see results</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
