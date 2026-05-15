"use client";

import ActiveSearchFilters from "@/components/ActiveSearchFilters";
import LocationSearch from "@/components/LocationSearch";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import { ChevronDown, LucideListFilter } from "lucide-react";
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
  const [query, setQuery] = useQueryState(queryParam, {
    defaultValue: "",
  });

  return (
    <div className="bg-gray-100">
      <hr className="bg-muted-foreground" />
      <ActiveSearchFilters />
      <main className="pt-12 pb-24 px-8 min-h-screen w-full mx-auto max-w-7xl">
        <div className="mb-10 flex justify-between items-end">
          <div className="w-full">
            <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter mb-10">
              Discover <span className="text-primary">places</span>
            </h1>
            <div className="flex items-center justify-between">
              <LocationSearch />

              <Button variant="ghost">
                <LucideListFilter />
                Filters
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Showing {searchResults.length} results matching your criteria near{" "}
              {query}
            </p>
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
