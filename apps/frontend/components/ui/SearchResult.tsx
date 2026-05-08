import { Button } from "./button";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { FaBolt } from "react-icons/fa6";
import { MapPin } from "lucide-react";
import Image from "next/image";

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
    <div className="group rounded-[2.5rem] overflow-hidden shadow-sm bg-white">
      <div className="relative h-64 overflow-hidden">
        <Image
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={name}
          src={
            "https://lh3.googleusercontent.com/aida/ADBb0uiGHfgr55ThFf6QFyArdeNtirsUcIUf-U_h7Q37PHOGyF5qTvy3Fglod0J6JFH-cgB77jUUx4fFEURbpcLPxM21gnuH3Up8l0I0ILqws7I8R8sax0OCvdPQks81PVVy46f6eD7-2BCksodJVJAgBYJX0sa-P49bF0NrslrcfTLEY-BesT0KlQnz2eQE0AA86RS2bCmBNfIcfAOpNT0mpqF2S35tCVdsV3Vpx1jPopqaNvccbqniv1cCSeVX23G_XFXbMGiSn6nSQKU"
          }
        />
        <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary-container px-4 py-1 rounded-full font-black text-[10px] tracking-widest shadow-lg uppercase">
          Self-Contain
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-primary flex items-center gap-1 shadow-md">
          <BiSolidBadgeCheck size={18} />
          <span className="text-xs font-bold">Verified</span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm flex items-center gap-1 text-muted-foreground">
              <MapPin size={12} />
              {location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary leading-none">
              ₦{formattedPrice}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-tighter">
              per session
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-6 text-muted-foreground">
          <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-gray-200">
            <FaBolt />
            Prepaid Meter
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-gray-200">
            <PiShieldCheckeredFill size={13} />
            24/7 Security
          </span>
        </div>
        <Button
          variant="ghost"
          size="xl"
          className="w-full py-4 rounded-2xl font-bold bg-primary/10"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
