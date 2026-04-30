"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateHostelListingData, createHostelListingSchema } from "@/lib/forms";
import { defaultLngLat, LngLat, nigerianCities } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Info,
  Sparkles,
  Link2,
  Star,
  StarHalf,
  ShieldCheck,
  BadgeCheck,
  MapPin,
  MapIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Map, MapControls, MapMarker, MarkerContent, MarkerLabel } from "../ui/map";
import MapEventListener from "../MapEventListener";
import { useEffect, useState } from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";

export default function CreateHostelListingForm() {
  const form = useForm<CreateHostelListingData>({
    resolver: zodResolver(createHostelListingSchema),
    defaultValues: {
      name: "",
      city: "",
      estimatedPriceRange: 0,
      address: "",
      etaMins: 0,
      googlePlaceId: "",
      isVerified: false,
      latitude: 9.967,
      longitude: 8.606,
      distanceKm: 0,
    },
  });
  const [marker, setMarker] = useState(defaultLngLat);

  const handleMapClick = (e) => {
    setMarker({ lng: e.lngLat.lng, lat: e.lngLat.lat });
  };

  const handleDrag = (lngLat: LngLat) => {
    setMarker({ lng: lngLat.lng, lat: lngLat.lat });
  };

  const onSubmit = (values: CreateHostelListingData) => {
    console.log(values);
  };

  useEffect(() => {
    form.setValue("longitude", marker.lng);
    form.setValue("latitude", marker.lat);
  }, [marker]);

  return (
    <form
      id="create-hostel-listing-form"
      className="space-y-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <section className="p-6 sm:p-8 rounded-[2rem] shadow-lg border border-gray-300/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
            <Info size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">General Info</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="name"
                    className="uppercase text-xs font-bold"
                    aria-invalid={fieldState.invalid}
                  >
                    Hostel Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g Healthcare hostel"
                    className="input-bg"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="city"
                      className="uppercase text-xs font-bold"
                    >
                      City
                    </FieldLabel>

                    <Combobox id="city" items={nigerianCities}>
                      <ComboboxInput
                        {...field}
                        className="input-bg h-12 rounded-md"
                        placeholder="Select a city"
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No city found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="estimatedPriceRange"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="estimatedPriceRange"
                      className="uppercase text-xs font-bold"
                      aria-invalid={fieldState.invalid}
                    >
                      Estimated Price Range
                    </FieldLabel>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                        ₦
                      </span>
                      <Input
                        {...field}
                        className="pl-8 input-bg"
                        placeholder="250,000 - 450,000"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="bg-primary/5 rounded-[2rem] p-6 flex flex-col justify-center border border-primary/10 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <Sparkles className="text-primary mb-4" size={40} fill="currentColor" />
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed relative z-10">
              "Tip: Using highly descriptive names helps students locate your listing
              faster in the search grid."
            </p>
          </div>
        </div>
      </section>

      <section className="p-6 sm:p-8 rounded-[2rem] relative overflow-hidden shadow-lg border border-gray-300/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
            <MapIcon size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Location & Proximity</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="address"
                    className="uppercase text-xs font-bold"
                    aria-invalid={fieldState.invalid}
                  >
                    Hostel Address
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="address"
                    aria-invalid={fieldState.invalid}
                    className="w-full rounded-xl border-none p-4 font-medium resize-none input-bg"
                    placeholder="Enter full physical address..."
                    rows={3}
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <FieldGroup className="flex-col md:flex-row">
              <Controller
                name="latitude"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="latitude"
                      className="uppercase text-xs font-bold"
                    >
                      Latitude (Main gate)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="latitude"
                      aria-invalid={fieldState.invalid}
                      placeholder="6.54326533"
                      className="input-bg"
                      type="text"
                      disabled
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="longitude"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="longitude"
                      className="uppercase text-xs font-bold"
                    >
                      Longitude (Main gate)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="longitude"
                      aria-invalid={fieldState.invalid}
                      placeholder="6.54326533"
                      className="input-bg"
                      disabled
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="flex-col md:flex-row">
              <Controller
                name="distanceKm"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="distance"
                      className="uppercase text-xs font-bold"
                    >
                      Distance (km)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="distance"
                      aria-invalid={fieldState.invalid}
                      className="input-bg"
                      disabled
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="etaMins"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="eta"
                      className="uppercase text-xs font-bold"
                    >
                      ETA (mins)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="eta"
                      aria-invalid={fieldState.invalid}
                      className="input-bg"
                      disabled
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className="lg:col-span-6 h-100 overflow-hidden rounded-[2.5rem] shadow-xl ring-1 ring-gray-500/10">
            <Map center={[8.606, 9.967]} zoom={4.2} theme="dark">
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
        </div>
      </section>

      <section className="bg-surface p-6 sm:p-8 rounded-[2rem] border-2 border-dashed border-outline-variant/40">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-tertiary text-on-tertiary rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Marketplace Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4">
            <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase">
              Google Place ID
            </label>
            <div className="flex items-center gap-2">
              <Controller
                name="googlePlaceId"
                control={form.control}
                render={({ field }) => (
                  <div className="relative">
                    <Link2
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                      size={16}
                    />

                    <Input
                      {...field}
                      className="pl-12 input-bg"
                      placeholder="ChIJN1t..."
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4">
            <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase">
              Google Rating
            </label>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-3xl font-black text-primary leading-none">
                4.8
              </span>
              <div className="flex text-tertiary">
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <Star size={18} fill="currentColor" strokeWidth={0} />
                <StarHalf size={18} fill="currentColor" strokeWidth={0} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-primary text-white p-6 rounded-3xl flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                <BiSolidBadgeCheck size={32} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Verified Property</h4>
                <p className="text-xs text-primary-light leading-snug lg:leading-normal">
                  Display Emerald Horizon Seal of Trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
