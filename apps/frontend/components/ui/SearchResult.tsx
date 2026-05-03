import { MdLocationPin, MdApartment } from "react-icons/md";
import { Button } from "./button";

interface SearchResultCardProps {
  price: number;
  name: string;
  location: string;
}

export default function SearchResultCard({
  price,
  name,
  location,
}: SearchResultCardProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });
  const formattedPrice = formatter.format(price);

  return (
    <article className="group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer relative border border-transparent hover:border-surface-container-highest">
      <div className="absolute top-6 right-6 z-20 bg-primary text-white font-bold text-sm px-2 py-1.5 rounded-md shadow-md uppercase tracking-widest">
        ₦{formattedPrice}
        <span className="text-[0.6rem] font-normal">/session</span>
      </div>
      <div className="relative h-64 overflow-hidden rounded-t-[2.5rem]">
        <img
          alt="Property Image"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          data-alt="modern minimalist student apartment interior with bright window soft sunlight green plants and wooden desk"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full text-white">
          <h3 className="font-headline text-2xl font-bold truncate drop-shadow-md">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-sm">
            <MdLocationPin />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col grow justify-between gap-6">
        <div className="flex items-center justify-between text-sm border-b pb-4">
          <div className="flex items-center gap-2" title="Property Type">
            <MdApartment className="text-primary" size={15} />
            <span className="font-medium">Self-Contain</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined">bed</span> 1
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined">shower</span> 1
            </span>
          </div>
        </div>
        <Button size="xl">View Details</Button>
      </div>
    </article>
  );
}
