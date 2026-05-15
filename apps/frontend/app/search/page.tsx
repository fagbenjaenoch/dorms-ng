"use client";

import ActiveSearchFilters from "@/components/ActiveSearchFilters";
import LocationSearch from "@/components/LocationSearch";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import { placeSearch } from "@/lib/api/search";
import { APIResponse, Place } from "@/lib/dto";
import useDebounce from "@/lib/hooks/useDebounce";
import { searchQueryParam } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LucideListFilter, MapPin } from "lucide-react";
import { useQueryState } from "nuqs";

type SearchResult = {
  name: string;
  location: string;
  price: number;
};

const searchResults: SearchResult[] = [
  {
    name: "Sunshine Hostel",
    location: "Yaba, Lagos",
    price: 150000,
  },
  {
    name: "Greenville Lodge",
    location: "Gwarinpa, Abuja",
    price: 250000,
  },
  {
    name: "Oceanview Annex",
    location: "Choba, Port Harcourt",
    price: 120000,
  },
  {
    name: "Heritage Homes",
    location: "Agodi, Ibadan",
    price: 80000,
  },
  {
    name: "Coal City Haven",
    location: "Independence Layout, Enugu",
    price: 110000,
  },
  {
    name: "Savannah Retreat",
    location: "Nassarawa, Kano",
    price: 70000,
  },
  {
    name: "Crocodile Creek",
    location: "Barnawa, Kaduna",
    price: 65000,
  },
  {
    name: "Royal Court",
    location: "GRA, Benin City",
    price: 130000,
  },
  {
    name: "Palm Grove",
    location: "Ewet Housing Estate, Uyo",
    price: 140000,
  },
  {
    name: "Paradise Lodge",
    location: "Marian Road, Calabar",
    price: 125000,
  },
  {
    name: "Plateau View",
    location: "Rayfield, Jos",
    price: 90000,
  },
  {
    name: "Harmony House",
    location: "Tanke, Ilorin",
    price: 85000,
  },
  {
    name: "Heartland Annex",
    location: "Ikenegbu, Owerri",
    price: 105000,
  },
  {
    name: "Sunshine Acres",
    location: "Alagbaka, Akure",
    price: 95000,
  },
  {
    name: "Rock City Hostel",
    location: "Ibara, Abeokuta",
    price: 100000,
  },
  {
    name: "Delta Breeze",
    location: "Nnebisi Road, Asaba",
    price: 115000,
  },
  {
    name: "Creek Haven",
    location: "Amarata, Yenagoa",
    price: 135000,
  },
  {
    name: "Osun Spring",
    location: "Ring Road, Osogbo",
    price: 75000,
  },
  {
    name: "Fountain Lodge",
    location: "Fajuyi, Ado-Ekiti",
    price: 80000,
  },
  {
    name: "Confluence Quarters",
    location: "Lokongoma, Lokoja",
    price: 85000,
  },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useQueryState(searchQueryParam, {
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
                        key={searchResult.id}
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
                Showing {searchResults.length} results matching your criteria near{" "}
                <b>{searchTerm}</b>
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map(({ name, location, price }, i) => (
            <PropertyCard key={i} name={name} location={location} price={price} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
