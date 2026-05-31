import {
  ChevronRight,
  GraduationCapIcon,
  History,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

function HistoryItem({ name }: { name: string }) {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium border bg-gray-100 text-muted-foreground hover:text-muted-foreground hover:bg-gray-200"
    >
      <History />
      {name}
    </Button>
  );
}

function TrendingItem({ name }: { name: string }) {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium border bg-primary-light text-primary hover:bg-primary-light/70"
    >
      <TrendingUp />
      {name}
    </Button>
  );
}

export default function LandingSearchDropdown() {
  return (
    <div className="absolute top-full left-0 w-full mt-4 rounded-xl shadow-2xl bg-white border overflow-hidden z-30 p-6 flex flex-col gap-8">
      <section>
        <h3 className="text-sm text-muted-foreground font-bold uppercase tracking-widest text-outline mb-4">
          Recent Searches
        </h3>
        <div className="flex flex-wrap gap-3">
          {["unilag", "ilorin"].map((item, i) => (
            <HistoryItem name={item} key={i} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-sm text-muted-foreground font-bold uppercase tracking-widest text-outline mb-4">
          Popular Institutions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="group flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-100">
            <span className="bg-primary-light px-3 py-3 flex items-center rounded-md">
              <GraduationCapIcon className="text-primary" size={15} />
            </span>
            <div>
              <h4 className="font-bold group-hover:text-primary transition-colors">
                University of Lagos
              </h4>
              <p className="text-sm">Yaba, Lagos</p>
            </div>
          </div>
          <div className="group flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-100">
            <span className="bg-primary-light px-3 py-3 flex items-center rounded-md">
              <GraduationCapIcon className="text-primary" size={15} />
            </span>
            <div>
              <h4 className="font-bold group-hover:text-secondary transition-colors">
                University of Ibadan
              </h4>
              <p className="text-sm">Ibadan, Oyo</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-sm text-muted-foreground font-bold uppercase tracking-widest text-outline mb-4">
          Trending Hostels
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <Link
            className="group flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-100"
            href="#"
          >
            <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
              <img
                alt="Emerald Heights"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://placeholder.pics/svg/300"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold group-hover:text-primary transition-colors">
                  Healthcare hostel
                </h4>
                <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                  Available
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin size={10} />
                1.5km from Unilorin main gate
              </p>
            </div>
            <ChevronRight size={15} />
          </Link>
          <Link
            className="group flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-100"
            href="#"
          >
            <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
              <img
                alt="Royal Oaks Annex"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://placeholder.pics/svg/300"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold group-hover:text-primary transition-colors">
                  Royal Oaks Annex
                </h4>
                <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                  2 Rooms Left
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin size={10} />
                1.2km from Akoka Market
              </p>
            </div>
            <ChevronRight size={15} />
          </Link>
        </div>
      </section>
      <section>
        <h3 className="text-sm text-muted-foreground font-bold uppercase tracking-widest text-outline mb-4">
          Trending Neighborhoods
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Yaba", "Ilorin"].map((item, i) => (
            <TrendingItem name={item} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
