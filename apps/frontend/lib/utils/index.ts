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

export const nigerianCities = [
  "Aba",
  "Abakaliki",
  "Abeokuta",
  "Abraka",
  "Abuja",
  "Ado-Ekiti",
  "Afikpo",
  "Agbor",
  "Ago-Iwoye",
  "Akungba-Akoko",
  "Akure",
  "Aliero",
  "Amassoma",
  "Anyigba",
  "Asaba",
  "Auchi",
  "Awka",
  "Azare",
  "Bama",
  "Bauchi",
  "Benin City",
  "Bida",
  "Birnin Kebbi",
  "Bokkos",
  "Bori",
  "Buguma",
  "Calabar",
  "Damaturu",
  "Daura",
  "Dutse",
  "Dutsin-Ma",
  "Ede",
  "Eket",
  "Ekpoma",
  "Elele",
  "Enugu",
  "Epe",
  "Gashua",
  "Gboko",
  "Gombe",
  "Gusau",
  "Ibadan",
  "Idah",
  "Ife",
  "Igbariam",
  "Ijebu-Ode",
  "Ikare",
  "Ikeja",
  "Ikot Ekpene",
  "Ilaro",
  "Ilesa",
  "Ilishan-Remo",
  "Ilorin",
  "Iwo",
  "Jalingo",
  "Jimeta",
  "Jos",
  "Kabba",
  "Kaduna",
  "Kafanchan",
  "Kano",
  "Kashere",
  "Katsina",
  "Kazaure",
  "Keffi",
  "Kontagora",
  "Lafia",
  "Lagos",
  "Lapai",
  "Lokoja",
  "Maiduguri",
  "Makurdi",
  "Minna",
  "Mowe",
  "Mubi",
  "Nekede",
  "Nnewi",
  "Nsukka",
  "Obudu",
  "Offa",
  "Ogbomosho",
  "Okada",
  "Okene",
  "Okija",
  "Oko",
  "Omoku",
  "Omu-Aran",
  "Ondo",
  "Onitsha",
  "Oron",
  "Osogbo",
  "Ota",
  "Otuoke",
  "Owerri",
  "Owo",
  "Oye-Ekiti",
  "Oyo",
  "Pankshin",
  "Port Harcourt",
  "Potiskum",
  "Sapele",
  "Shagamu",
  "Sokoto",
  "Suleja",
  "Ugep",
  "Ughelli",
  "Umuahia",
  "Umudike",
  "Umunze",
  "Uromi",
  "Uturu",
  "Uyo",
  "Vom",
  "Warri",
  "Wudil",
  "Wukari",
  "Yenagoa",
  "Yola",
  "Zaria",
] as const;

export const navLinks = [
  { title: "Find Hostels", href: "/search" },
  { title: "How it works", href: "#" },
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

export type AreaTypeEnum = "institution" | "neighborhood";

export const recentSearchesKey = "recentSearches";
