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
import { nigerianCities } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Info,
  Sparkles,
  Map,
  Compass,
  Link2,
  Star,
  StarHalf,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";

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
    },
  });

  const onSubmit = (values: CreateHostelListingData) => {
    console.log(values);
  };
  return (
    <form
      id="create-hostel-listing-form"
      className="space-y-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-[2rem] shadow-lg border border-gray-300/50">
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

      <section className="bg-surface-container p-6 sm:p-8 rounded-[2rem] relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
            <Map size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Location & Proximity</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <label className="block text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase mb-2">
                Street Address
              </label>
              <Controller
                name="address"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="w-full rounded-xl border-none p-4 font-medium resize-none"
                    placeholder="Enter full physical address..."
                    rows={3}
                  />
                )}
              />
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tertiary-container/30 p-4 rounded-2xl">
                <label className="block text-[10px] font-black text-on-tertiary-container mb-1">
                  DISTANCE (KM)
                </label>
                <Controller
                  name="distanceM"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      step="0.1"
                      className="w-full bg-transparent border-none text-2xl font-bold p-0 focus-visible:ring-0 shadow-none"
                      placeholder="0.5"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  )}
                />
              </div>
              <div className="bg-secondary-container/30 p-4 rounded-2xl">
                <label className="block text-[10px] font-black text-on-secondary-container mb-1">
                  ETA (MINS)
                </label>
                <Controller
                  name="etaMins"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      className="w-full bg-transparent border-none text-2xl font-bold p-0 focus-visible:ring-0 shadow-none"
                      placeholder="10"
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-surface-container-highest rounded-[2.5rem] h-[300px] sm:h-[400px] shadow-inner relative group overflow-hidden">
            <img
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              alt="Modern interactive map"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD71CYYTurIbwn_VD3odv8Jn7A33k9jqo4LIRILCe0gIqlgQHGgzmLhCoL7ecbQx7vFm6WxMQt6szJKt_90FYrG6RsCwJT_6SeKvS1NuLxwvzNLy2BjNsPti0U6cj_3jdzVMABxkMLY1LIZ5zQjdUWg-7vMh-zvemXAYnnNX3IwCl8G7KVZ6jIpv19Xb4aap1xTWzIsvjb_i8VvYHK_-uK82E_FrLMcUWu-4xB9dmh1jDeqGAeKOv7japGpB4D01I0Zc4iDA3B9ZCCb"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end justify-center sm:justify-start p-6 sm:p-8 pointer-events-none">
              <div className="bg-white/90 backdrop-blur p-4 rounded-2xl flex items-center gap-4 shadow-xl">
                <div className="bg-secondary text-white p-2 rounded-lg">
                  <Compass size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
                    Pin Location
                  </p>
                  <p className="text-xs sm:text-sm font-bold">
                    Drag and drop marker to refine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Verification */}
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
            <div className="flex items-center gap-2 bg-surface p-2 rounded-xl focus-within:ring-2 focus-within:ring-primary">
              <Link2 className="text-outline shrink-0 ml-2" size={16} />
              <Controller
                name="googlePlaceId"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-full bg-transparent border-none text-xs font-mono focus-visible:ring-0 shadow-none px-2 h-auto"
                    placeholder="ChIJN1t..."
                  />
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

          <div className="lg:col-span-2 bg-emerald-900 text-white p-6 rounded-3xl flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                <BadgeCheck
                  fill="currentColor"
                  className="text-emerald-900"
                  size={32}
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">Verified Property</h4>
                <p className="text-xs text-emerald-100/60 leading-snug lg:leading-normal">
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
