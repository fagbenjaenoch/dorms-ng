"use client";

import { Info, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNeighborhoodData, createNeighborhoodSchema } from "@/lib/forms";
import { Input } from "../ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { nigerianCities } from "@/lib/utils";
import { Button } from "../ui/button";
import { createNeighborhood } from "@/lib/api/neighborhood";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchAllInstitutions } from "@/lib/api/institution";

export default function CreateNeighborhoodForm() {
  const form = useForm({
    resolver: zodResolver(createNeighborhoodSchema),
    defaultValues: {
      name: "",
      institution: "",
      institutionId: "",
      city: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createNeighbourhood"],
    mutationFn: createNeighborhood,
    onSuccess: () => {
      toast.success("Created Neighbourhood Successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const query = useQuery({
    queryKey: ["fetchAllInstitutions"],
    queryFn: fetchAllInstitutions,
  });

  const institutions = query.data?.payload;

  const onSubmit = async (data: CreateNeighborhoodData) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form id="neighborhood-form" onSubmit={form.handleSubmit(onSubmit)}>
      <section className="lg:max-w-3xl p-6 sm:p-8 rounded-[2rem] shadow-lg border border-gray-300/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
            <Info size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">General Info</h2>
        </div>

        <FieldGroup>
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
                  Neighborhood Name
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g Tanke"
                  className="input-bg"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="institution"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="institution"
                  className="uppercase text-xs font-bold"
                >
                  Institution
                </FieldLabel>

                <Combobox id="institution" items={institutions}>
                  <ComboboxInput
                    {...field}
                    className="input-bg h-12 rounded-md"
                    placeholder="Select an institution"
                    showClear={true}
                    aria-invalid={fieldState.invalid}
                  />
                  <ComboboxContent>
                    {query.isLoading ? (
                      <ComboboxEmpty>Loading...</ComboboxEmpty>
                    ) : (
                      <>
                        <ComboboxEmpty>No institution found.</ComboboxEmpty>
                        <ComboboxList>
                          {({ name, id }) => (
                            <ComboboxItem
                              key={id}
                              value={id}
                              onClick={() => {
                                field.onChange(name);
                                form.setValue("institutionId", id);
                              }}
                            >
                              {name}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </>
                    )}
                  </ComboboxContent>
                </Combobox>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="city" className="uppercase text-xs font-bold">
                  City
                </FieldLabel>

                <Combobox id="city" items={nigerianCities}>
                  <ComboboxInput
                    {...field}
                    className="input-bg h-12 rounded-md"
                    placeholder="Select a city"
                    showClear={true}
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No city found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: string) => (
                        <ComboboxItem
                          key={item}
                          value={item}
                          onClick={() => field.onChange(item)}
                        >
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <Button
              type="submit"
              size="xl"
              className="inline-flex gap-2"
              disabled={mutation.isPending}
            >
              <Save /> {mutation.isPending ? "Creating" : "Create Neighborhood"}
            </Button>
            <Button
              size="xl"
              variant="outline"
              type="reset"
              onClick={() => form.reset()}
              className="bg-gray-300/50 hover:bg-gray-300/30"
            >
              Discard changes
            </Button>
          </div>
        </FieldGroup>
      </section>
    </form>
  );
}
