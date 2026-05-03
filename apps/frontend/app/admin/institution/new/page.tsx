"use client";

import { CheckCircle2, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import CreateInstitutionForm from "@/components/admin/CreateInstitutionForm";
import DashboardHeader from "@/components/admin/DashboardHeader";
import {
  Map,
  MapControls,
  MapMarker,
  MapRef,
  MarkerContent,
  MarkerLabel,
} from "@/components/ui/map";
import MapEventListener from "@/components/MapEventListener";
import { defaultLngLat, LngLat } from "@/lib/utils";
import { BiSolidBadgeCheck } from "react-icons/bi";

// export const metadata = {
//   title: "Create Institution",
//   description: "Add a new institution to the marketplace.",
// };

export default function CreateInstitution() {
  const mapRef = useRef<MapRef>(null);
  const [marker, setMarker] = useState(defaultLngLat);

  const handleDrag = (lngLat: LngLat) => {
    setMarker({ lng: lngLat.lng, lat: lngLat.lat });
  };

  const handleMapClick = (e) => {
    setMarker({ lng: e.lngLat.lng, lat: e.lngLat.lat });

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 15,
        speed: 1.2,
      });
    }
  };

  return (
    <div className="min-h-screen w-full">
      <main className="flex-1 ml-64 min-h-screen relative">
        <DashboardHeader title="Manage Institutions" />

        <div className="p-10 max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-5xl font-bold tracking-tighter text-on-surface leading-none">
              Create New <span className="ext-primary">Institution</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed">
              Register a new academic institution to the Emerald Horizon directory.
              Ensure geographic coordinates are accurate for students to find hostels
              nearby.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8">
              <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-sm border border-surface-container transition-all duration-700 delay-100 fill-mode-both">
                <CreateInstitutionForm lng={marker.lng} lat={marker.lat} />
              </section>

              <div className="bg-tertiary/20 rounded-[2.5rem] p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Did you know?
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                    Correct coordinates ensure that our hostel recommendations stay
                    within a 15-minute walking distance for students.
                  </p>
                </div>
                <BiSolidBadgeCheck
                  className="absolute -bottom-4 -right-4 text-9xl text-tertiary/20 rotate-12 transition-transform duration-700"
                  size={160}
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="h-100 overflow-hidden rounded-[2.5rem] shadow-xl ring-1 ring-gray-500/10">
                <Map ref={mapRef} center={[8.606, 9.967]} zoom={4.2} theme="dark">
                  <MapControls
                    position="top-right"
                    showLocate
                    showCompass
                    showFullscreen
                    showZoom
                  />
                  <MapMarker
                    draggable
                    longitude={marker.lng}
                    latitude={marker.lat}
                    onDrag={handleDrag}
                  >
                    <MarkerContent>
                      <MapPin
                        className="cursor-move fill-red-500 stroke-white"
                        size={28}
                      />
                      <MarkerLabel position="bottom" className="text-white">
                        Drag this!
                      </MarkerLabel>
                    </MarkerContent>
                    <MapEventListener handleClick={handleMapClick} />
                  </MapMarker>
                </Map>
              </div>

              <div className="bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 transition-transform duration-700" />
                <h4 className="text-2xl font-bold mb-6 relative z-10">
                  Quality Assurance
                </h4>
                <ul className="space-y-4 relative z-10">
                  {[
                    "Auto-geocoding validation",
                    "High-res aerial imagery",
                    "Street view integration",
                  ].map((text, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium"
                    >
                      <CheckCircle2 className="text-tertiary" size={20} />
                      <span className="opacity-90">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
