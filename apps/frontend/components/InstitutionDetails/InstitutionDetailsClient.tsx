import { BusIcon, Compass, GraduationCap, MapIcon, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { MdTune } from "react-icons/md";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { CgBolt } from "react-icons/cg";
import { FaBolt, FaPersonWalking } from "react-icons/fa6";
import {
  PiMapPinArea,
  PiMapPinAreaBold,
  PiShieldCheckeredFill,
} from "react-icons/pi";

export default function InstitutionDetailsClient() {
  return (
    <main className="pt-20">
      <section className="relative px-8 py-12 pb-32 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center uppercase gap-2 px-3 py-1 bg-tertiary text-amber-800 rounded-full text-xs font-black tracking-widest mb-6">
              <GraduationCap size={14} />
              Top Tier Institution
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
              University of <span className="text-primary">Lagos</span>
            </h1>
            <p className="text-2xl font-bold text-muted-foreground mb-8 tracking-tight">
              UNILAG • Akoka, Yaba
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-muted-foreground/10 p-6 rounded-[2rem] transition-colors duration-300">
                <p className="text-3xl font-black text-primary">124+</p>
                <p className="text-sm font-medium">Affiliated Hostels</p>
              </div>
              <div className="bg-muted-foreground/10 p-6 rounded-[2rem] transition-colors duration-300">
                <p className="text-3xl font-black text-secondary">55k+</p>
                <p className="text-sm font-medium">Student Population</p>
              </div>
              <div className="bg-muted-foreground/10 p-6 rounded-[2rem] transition-colors duration-300">
                <p className="text-3xl font-black">4.8</p>
                <p className="text-sm font-medium">Safety Rating</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="default"
                size="xl"
                className="px-8 py-4 flex items-center gap-2"
              >
                <Compass />
                Explore Nearby Hostels
              </Button>
              <Button
                variant="ghost"
                size="xl"
                className="px-8 py-4 text-primary rounded-2xl font-bold flex items-center gap-2 shadow-sm border border-outline-variant/40 transition-colors duration-300"
              >
                <MapIcon /> View on Map
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-2">
                Hostels near <span className="text-primary">UNILAG</span>
              </h2>
              <p className="font-medium text-lg">
                Verified student housing within 2km of the campus gate.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="p-3 rounded-xl shadow-sm text-black hover:text-primary transition-colors"
              >
                <MdTune size={25} />
              </Button>
              <select className="border-none rounded-xl font-bold px-6 py-3 shadow-sm focus:ring-primary">
                <option>Price: Low to High</option>
                <option>Closest to Gate</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="A modern, high-end student hostel room featuring clean white walls, minimalist wooden furniture, and large windows that let in natural bright light. The interior is decorated with subtle green accents and academic decor. The photography style is professional real estate photography with a warm, inviting atmosphere and soft shadows."
                  src="https://lh3.googleusercontent.com/aida/ADBb0uiGHfgr55ThFf6QFyArdeNtirsUcIUf-U_h7Q37PHOGyF5qTvy3Fglod0J6JFH-cgB77jUUx4fFEURbpcLPxM21gnuH3Up8l0I0ILqws7I8R8sax0OCvdPQks81PVVy46f6eD7-2BCksodJVJAgBYJX0sa-P49bF0NrslrcfTLEY-BesT0KlQnz2eQE0AA86RS2bCmBNfIcfAOpNT0mpqF2S35tCVdsV3Vpx1jPopqaNvccbqniv1cCSeVX23G_XFXbMGiSn6nSQKU"
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
                    <h3 className="text-xl font-bold mb-1">Platinum Heights</h3>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin size={12} />
                      Akoka (5 mins walk)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary leading-none">
                      ₦450k
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-tighter">
                      per session
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <FaBolt />
                    Prepaid Meter
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
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
            <div className="group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="A contemporary exterior of a multi-story student residence building with sleek architectural lines and vibrant landscaping. The building facade is painted in neutral earth tones with emerald green window frames. The setting is a clear bright day in Lagos with a deep blue sky. High-end architectural visualization style with realistic lighting and reflections."
                  src="https://lh3.googleusercontent.com/aida/ADBb0uh-38lYvbhwE3C7Wz468a8KEABCdKlg8xdky9MLkyIcFhuU793UrIZm0o9h1arqPlEPJqUq-BSnoSM1c-J7oHNvotjTDmgxyvYCKWXRJumEUs0j5ymaZa-EG_Iz97E6aHtElzRHqM61iOdG7bfxdSP7nRye6I0KEgcZPIgmQYRweEae_EY8l4QjgUlbrzCPJslEdWc8pnZPZstBRlAv6eDgGZXE5DdrNrDEif117Osh4ddV3HPZldmv6t8DCukbPcl_atjWeZX13Q"
                />
                <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary-container px-4 py-1 rounded-full font-black text-[10px] tracking-widest shadow-lg uppercase">
                  Apartment
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Emerald Villas</h3>
                    <p className="text-sm flex items-center gap-1">
                      Abule Oja (10 mins walk)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary leading-none">
                      ₦600k
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-tighter">
                      per session
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">wifi</span>{" "}
                    High-speed WiFi
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      water_drop
                    </span>{" "}
                    Water Inc.
                  </span>
                </div>
                <button className="w-full py-4 bg-primary/10 text-primary rounded-2xl font-bold hover:bg-primary hover:text-on-primary transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
            <div className="group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  data-alt="A cozy and functional student living space showing a study area with a modern desk, ergonomic chair, and floating bookshelves. The room is brightly lit with warm evening lighting coming from a desk lamp, creating a focused and studious atmosphere. The design is contemporary Nigerian student-chic with emerald green accents and scholarly aesthetics."
                  src="https://lh3.googleusercontent.com/aida/ADBb0uiGHfgr55ThFf6QFyArdeNtirsUcIUf-U_h7Q37PHOGyF5qTvy3Fglod0J6JFH-cgB77jUUx4fFEURbpcLPxM21gnuH3Up8l0I0ILqws7I8R8sax0OCvdPQks81PVVy46f6eD7-2BCksodJVJAgBYJX0sa-P49bF0NrslrcfTLEY-BesT0KlQnz2eQE0AA86RS2bCmBNfIcfAOpNT0mpqF2S35tCVdsV3Vpx1jPopqaNvccbqniv1cCSeVX23G_XFXbMGiSn6nSQKU"
                />
                <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary-container px-4 py-1 rounded-full font-black text-[10px] tracking-widest shadow-lg uppercase">
                  Bunk Space
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Scholar's Nest</h3>
                    <p className="text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>{" "}
                      Onike (15 mins walk)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary leading-none">
                      ₦250k
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-tighter">
                      per session
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">group</span>{" "}
                    Shared Kitchen
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      laundry
                    </span>{" "}
                    Laundry Area
                  </span>
                </div>
                <button className="w-full py-4 bg-primary/10 text-primary rounded-2xl font-bold hover:bg-primary hover:text-on-primary transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="rounded-[3rem] overflow-hidden shadow-xl border border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <PiMapPinArea size={20} />
                <h2 className="text-3xl font-bold tracking-tight">Prime Location</h2>
              </div>
              <p className="mb-8 leading-relaxed">
                UNILAG is situated in the vibrant Akoka-Yaba axis, perfectly
                positioned between the Lagos mainland and the island. All our listed
                hostels are strategically mapped to ensure you're never more than a
                short walk or quick shuttle ride away from your faculty.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-200">
                  <div className="bg-primary p-2 py-3 rounded-xl">
                    <FaPersonWalking size={20} className="text-primary-light" />
                  </div>
                  <div>
                    <h4 className="font-bold">5-10 Min Walk</h4>
                    <p className="text-xs text-muted-foreground">
                      Akoka &amp; Abule-Oja Gate Area
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-200">
                  <div className="bg-secondary p-2 py-3 rounded-xl">
                    <BusIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">15 Min Shuttle</h4>
                    <p className="text-xs text-muted-foreground">
                      Onike &amp; Iwaya Neighborhoods
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 relative min-h-[500px]">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  data-location="Lagos, Nigeria"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuxjCUrNAD1BiGxZOx6qtD7ADIW90zJnEUlLNMxYByrYcZqmfKvlI2NKCWKOgfyWp8aUcZvnOa_NLpUh3MDCKfx1oAJthRZIa9nn5KdZb4Uq1HPUbGvPgmDbChYeTzKmS-gN6cwN6n4rEtMcoQbik05B4WKgr4mOD1RnGHtw2F95xzPVvCaXwsB_HSppe9_LNfuqzS6zFDNcEfgz4vIEKN05-HuQNbWUaVwdB0YAPkNdUZKAAjdSsoDOVKenLNXl7pp59nLqkc6n5E"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-full animate-ping absolute inset-0 opacity-20"></div>
                    <div className="relative w-12 h-12 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-white">
                        school
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[40%] left-[30%] w-8 h-8 bg-secondary rounded-full border-2 border-white flex items-center justify-center shadow-md hover:scale-125 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    home
                  </span>
                </div>
                <div className="absolute top-[60%] left-[45%] w-8 h-8 bg-secondary rounded-full border-2 border-white flex items-center justify-center shadow-md hover:scale-125 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    home
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
