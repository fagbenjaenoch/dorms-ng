import { CreateInstitutionData, createInstitutionSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CreateInstitutionFormProps {
  lng: number;
  lat: number;
}

export default function CreateInstitutionForm({
  lng,
  lat,
}: CreateInstitutionFormProps) {
  const form = useForm<CreateInstitutionData>({
    resolver: zodResolver(createInstitutionSchema),
    defaultValues: {
      name: "",
      acronym: "",
      latitude: 0,
      longitude: 0,
    },
  });

  form.setValue("latitude", lat);
  form.setValue("longitude", lng);

  const mutation = useMutation({
    mutationKey: ["createInstitution"],
    mutationFn: async (data: CreateInstitutionData) => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/institutions", {
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
    <form
      id="institution-form"
      className="space-y-8"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="acronym"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="acronym" className="uppercase text-xs">
                Acronym
              </FieldLabel>
              <Input
                {...field}
                id="acronym"
                aria-invalid={fieldState.invalid}
                placeholder="e.g unilorin"
                className="bg-gray-300/50"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              <FieldLabel htmlFor="latitude" className="uppercase text-xs">
                Latitude (Main gate)
              </FieldLabel>
              <Input
                {...field}
                id="latitude"
                aria-invalid={fieldState.invalid}
                placeholder="6.54326533"
                className="bg-gray-300/50"
                type="text"
                disabled
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="longitude"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="longitude" className="uppercase text-xs">
                Longitude (Main gate)
              </FieldLabel>
              <Input
                {...field}
                id="longitude"
                aria-invalid={fieldState.invalid}
                placeholder="6.54326533"
                className="bg-gray-300/50"
                disabled
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <Button
          type="submit"
          size="xl"
          className="inline-flex gap-2"
          disabled={mutation.isPending}
        >
          <Save /> {mutation.isPending ? "Creating" : "Create Institution"}
        </Button>
        <Button
          size="xl"
          variant="outline"
          type="reset"
          onClick={() => form.reset()}
        >
          Discard changes
        </Button>
      </div>
    </form>
  );
}
