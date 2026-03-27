"use client";

import { LoginData, loginSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SigninForm() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };

  return (
    <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signin-form" className="uppercase text-xs">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="signin-form"
                aria-invalid={fieldState.invalid}
                placeholder="bola.musa.adabize@email.com"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signin-form" className="uppercase text-xs">
                Password
              </FieldLabel>
              <Input
                {...field}
                id="signin-form"
                aria-invalid={fieldState.invalid}
                placeholder="Min. 8 Characters"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        className="mt-6 text-white w-full py-8 text-base cursor-pointer"
        onClick={form.handleSubmit(onSubmit)}
        form="signin-form"
      >
        Login
      </Button>
    </form>
  );
}
