"use client";

import { SignupData, signupSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function SignupForm() {
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
  });

  const onSubmit = async (data: SignupData) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      console.log(payload);
    } catch (err) {
      toast.error("could not login");
      console.error(err);
    }
  };

  return (
    <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="fullname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="signup-form"
                className="uppercase text-xs"
                aria-invalid={fieldState.invalid}
              >
                Full Name
              </FieldLabel>
              <Input
                {...field}
                id="signup-form"
                aria-invalid={fieldState.invalid}
                placeholder="Bola Musa Adabize"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-form" className="uppercase text-xs">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="signup-form"
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
              <FieldLabel htmlFor="signup-form" className="uppercase text-xs">
                Password
              </FieldLabel>
              <Input
                {...field}
                id="signup-form"
                aria-invalid={fieldState.invalid}
                placeholder="Min. 8 Characters"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <p>
          I agree to the{" "}
          <Link href="#" className="text-primary underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary underline underline-offset-2">
            Student Safety Policy
          </Link>
          .
        </p>
      </FieldGroup>
      <Button
        className="mt-6 text-white w-full py-8 text-base cursor-pointer"
        onClick={form.handleSubmit(onSubmit)}
        form="signup-form"
      >
        Create Account
      </Button>
    </form>
  );
}
