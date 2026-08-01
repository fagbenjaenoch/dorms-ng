import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function scrollTo(selector: string) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export const nigerianStatesAndCities = {
  Abia: ["Aba", "Umuahia", "Umudike"],
  Adamawa: ["Jimeta", "Mubi", "Yola"],
  "Akwa Ibom": ["Eket", "Ikot Ekpene", "Oron", "Uyo"],
  Anambra: ["Awka", "Nnewi", "Okija", "Onitsha", "Umunze"],
  Bauchi: ["Azare", "Bauchi"],
  Bayelsa: ["Amassoma", "Otuoke", "Yenagoa"],
  Benue: ["Gboko", "Makurdi"],
  Borno: ["Bama", "Maiduguri"],
  "Cross River": ["Calabar", "Obudu"],
  Delta: ["Abraka", "Agbor", "Asaba", "Sapele", "Ughelli", "Warri"],
  Ebonyi: ["Abakaliki", "Afikpo"],
  Edo: ["Auchi", "Benin City", "Ekpoma", "Okada", "Uromi"],
  Ekiti: ["Ado-Ekiti", "Oye-Ekiti"],
  Enugu: ["Enugu", "Nsukka"],
  FCT: ["Abuja"],
  Gombe: ["Gombe"],
  Imo: ["Owerri"],
  Jigawa: ["Dutse"],
  Kaduna: ["Kaduna", "Kafanchan", "Zaria"],
  Kano: ["Kano", "Wudil"],
  Katsina: ["Daura", "Dutsin-Ma", "Katsina"],
  Kebbi: ["Aliero", "Birnin Kebbi"],
  Kogi: ["Idah", "Kabba", "Lokoja", "Okene"],
  Kwara: ["Ilorin", "Offa"],
  Lagos: ["Epe", "Ikeja", "Lagos"],
  Nasarawa: ["Keffi", "Lafia"],
  Niger: ["Bida", "Kontagora", "Lapai", "Minna", "Suleja"],
  Ogun: ["Abeokuta", "Ago-Iwoye", "Ijebu-Ode", "Ilaro", "Ota", "Shagamu"],
  Ondo: ["Akungba-Akoko", "Akure", "Ikare", "Ondo", "Owo"],
  Osun: ["Ede", "Ife", "Ilesa", "Ilishan-Remo", "Iwo", "Osogbo"],
  Oyo: ["Ibadan", "Ogbomosho", "Oyo"],
  Plateau: ["Bokkos", "Jos", "Pankshin", "Vom"],
  Rivers: ["Bori", "Buguma", "Elele", "Omoku", "Port Harcourt"],
  Sokoto: ["Sokoto"],
  Taraba: ["Jalingo", "Wukari"],
  Yobe: ["Damaturu", "Gashua", "Potiskum"],
  Zamfara: ["Gusau"],
} as const;

export const nigerianStates = Object.keys(
  nigerianStatesAndCities,
) as (keyof typeof nigerianStatesAndCities)[];

export type NigerianState = (typeof nigerianStates)[number];

export const navLinks = [
  { title: "Find Hostels", href: "/search" },
  { title: "About Us", href: "/about" },
  { title: "Support", href: "#" },
];

export type LngLat = {
  lng: number;
  lat: number;
};

export const defaultLngLat: LngLat = { lng: 8.606, lat: 9.967 };

export const searchQueryParam = "q";
export const typeParam = "type";
export const idParam = "id";
export const fromSearchPageParam = "from_search_page";

export const recentSearchesKey = "recentSearches";

export interface UploadFile {
  file: File;
  isPrimary: boolean;
}

export const defaultFilters = {
  sortBy: "price-asc" as const,
  minPrice: 20_000,
  maxPrice: 5_000_000,
  isVerfied: false,
  page: 1,
  limit: 10,
};
