import ActiveSearchFilters from "@/components/ActiveSearchFilters";
import BrandIcon from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import SearchResultCard from "@/components/ui/SearchResult";
import { ChevronDown, LucideListFilter, X } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="bg-background text-on-background font-body antialiased selection:bg-tertiary selection:text-on-tertiary-container">
      <nav className="bg-white z-50 shadow-sm flex justify-between items-center px-8 h-20 w-full fixed top-0 tonal shift bg-surface-container">
        <div className="flex items-center gap-12">
          <Link href="/">
            <BrandIcon />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="link">Sign In</Button>
          <Button size="xl">List Property</Button>
        </div>
      </nav>
      <ActiveSearchFilters />
      <main className="pt-44 pb-24 px-8 min-h-screen w-full max-w-400 mx-auto">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-black text-on-surface tracking-tighter leading-none">
              Discover <span className="text-primary">places</span>
            </h1>
            <p className="text-on-surface-variant mt-3 text-lg">
              Showing {searchResults.length} results matching your criteria near
              Search term
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl shadow-sm cursor-pointer ring-1 ring-gray-800/10">
            Sort by: <span className="text-primary font-bold">Recommended</span>
            <ChevronDown className="text-primary" size={15} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {searchResults.map(({ name, location, price }, i) => (
            <SearchResultCard
              key={i}
              name={name}
              location={location}
              price={price}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
