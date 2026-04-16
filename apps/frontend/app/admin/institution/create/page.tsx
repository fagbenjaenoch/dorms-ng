"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CreateInstitutionData, createInstitutionSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Bell,
  CheckCircle2,
  GraduationCap,
  MapIcon,
  Settings,
  VerifiedIcon,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateInstitution() {
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CreateInstitutionData>({
    resolver: zodResolver(createInstitutionSchema),
    defaultValues: {
      name: "",
      acronym: "",
      latitude: "",
      longitude: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createInstitution"],
    mutationFn: async (data: CreateInstitutionData) => {
      try {
        const res = await fetch("/api/institutions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          throw new Error("Failed to create institution");
        }
        return res.json();
      } catch (error) {
        throw new Error("Failed to create institution");
      }
    },
  });

  const onSubmit = async (data: CreateInstitutionData) => {
    const payload = await mutation.mutateAsync(data);
    console.log(payload);
  };

  return (
    <div className="min-h-screen w-full">
      <main className="flex-1 ml-64 min-h-screen relative">
        <header className="bg-white/70 backdrop-blur-md sticky top-0 z-40 shadow-sm flex justify-between items-center w-full px-8 py-4 border-b border-surface-container">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black text-primary tracking-tight">
              Institution Management
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Button className="cursor-pointer bg-primary-light text-primary hover:bg-primary-light/50 rounded-full">
              <Bell size={20} />
            </Button>
            <Button className="cursor-pointer bg-primary-light text-primary hover:bg-primary-light/50 rounded-full">
              <Settings size={20} />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-surface-container-high">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-on-surface">Admin User</p>
                <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">
                  John Doe
                </p>
              </div>
              <img
                alt="Administrator profile"
                className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdf2h4yx7EGENFDiKWqrip5N93usWX-5RjXmKqIdI260XOBGNIYzIDcyJrHCYlWyeGJjh3aihhjhhZnm4eWim-53Jg58l1cVyK97McN6GcSIFIm0w5w-dJyvhWD4-1Y1YYxOOP-sTqW_Oqf9cuNrMtW1fo4GZ4a7GyUC6EN6QZ7actA1LSdiskiBJhYHKInNXYq1xzsQ5F9TLb6aGHmfaBcK6RMfyFNYHCKWjmuJRLzNnG0YFA_mrrR2Sjao2hNQlH38IGYIx-54oB"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-5xl font-bold tracking-tighter text-on-surface leading-none">
              Create New <span className="italic text-primary">Institution</span>
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
                <form id="institution-form" className="space-y-8">
                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="name"
                            className="uppercase text-xs"
                            aria-invalid={fieldState.invalid}
                          >
                            Name of Institution
                          </FieldLabel>
                          <Input
                            {...field}
                            id="name"
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g University of Ilorin"
                            className="bg-gray-300/50"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="acronym"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="acronym"
                            className="uppercase text-xs"
                          >
                            Acronym
                          </FieldLabel>
                          <Input
                            {...field}
                            id="acronym"
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g unilorin"
                            className="bg-gray-300/50"
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
                      name="latitude"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="latitude"
                            className="uppercase text-xs"
                          >
                            Latitude (Main gate)
                          </FieldLabel>
                          <Input
                            {...field}
                            id="latitude"
                            aria-invalid={fieldState.invalid}
                            placeholder="6.54326533"
                            className="bg-gray-300/50"
                            type="text"
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
                            className="uppercase text-xs"
                          >
                            Longitude (Main gate)
                          </FieldLabel>
                          <Input
                            {...field}
                            id="longitude"
                            aria-invalid={fieldState.invalid}
                            placeholder="6.54326533"
                            className="bg-gray-300/50"
                            type="password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              </section>

              <div className="bg-tertiary/10 rounded-[2.5rem] p-8 relative overflow-hidden border border-tertiary/20">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Did you know?
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                    Correct coordinates ensure that our hostel recommendations stay
                    within a 15-minute walking distance for students.
                  </p>
                </div>
                <VerifiedIcon
                  className="absolute -bottom-4 -right-4 text-9xl text-tertiary/10 rotate-12 transition-transform duration-700"
                  size={160}
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-surface-container-lowest rounded-[2.5rem] p-4 shadow-2xl border border-surface-container transform rotate-2 hover:rotate-0 transition-transform">
                <div className="relative rounded-[2rem] overflow-hidden aspect-square bg-surface-container shadow-inner group">
                  <img
                    className="w-full h-full object-cover mix-blend-overlay grayscale opacity-50 transition-transform duration-1000 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwJ8COZH33TMOjlBJcf4z5yPPkEwH5WllpLOztxK81oQTEF6gW2LexqXQEe1E0SjFBJNxv67HgpU4Z8nS_8qJ8qnLyxbxGyFMGDqpKxrwKcbWR-_vDqFgsDZB3jCiD892TXW06C6hKS6Z0_JCXXl9jQ8At0mZMYzVgxWeuItu5G3m8TiGVrpJtXTL2K05o7Ot9z-4ZoaSTdPsg_1rQBK-D86Za97XxOmZlqdHIEG9BCf69x7MCt-v9Bw95Sugydk-NPGGouGOgtmso"
                    alt="Map Preview"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <div
                        className="absolute -inset-6 bg-primary/20 rounded-full animate-ping"
                        style={{
                          animationDuration: "3s",
                        }}
                      />
                      <div className="relative bg-primary text-white p-4 rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-110">
                        <GraduationCap size={24} fill="currentColor" />
                      </div>
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-lg border border-primary/10 whitespace-nowrap transition-all duration-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                          Coordinate Preview
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Map UI elements */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-4 shadow-lg transition-transform duration-500 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                      <MapIcon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        Main Gate Visualization
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">
                        Lagos, District 2
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight text-on-surface">
                    Location Verification
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    The map pin represents the precise location of the campus main
                    gate entrance.
                  </p>
                </div>
              </div>

              {/* Side Benefit Card */}
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
