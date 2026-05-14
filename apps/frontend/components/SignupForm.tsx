"use client";

import { SignupData, signupSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { APIResponse, BaseAuthPayload } from "@/lib/dto";
import { KeyRound, MailIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import { BsPerson } from "react-icons/bs";

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (user: SignupData) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/signup`, {
          method: "POST",
          body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error("could not signup");

        return res.json() as any as APIResponse<BaseAuthPayload>;
      } catch (err) {
        toast.error("could not login");
        console.error(err);
      }
    },
  });

  const handleSubmit = async (data: SignupData) => {
    const payload = await mutation.mutateAsync(data);
    if (payload?.success) {
      router.push("/app");
    }
  };

  return (
    <form id="signup-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="fullname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="fullname"
                className="uppercase text-xs"
                aria-invalid={fieldState.invalid}
              >
                Full Name
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Bola Musa Adabize"
                />
                <InputGroupAddon>
                  <BsPerson />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className="uppercase text-xs">
                Email
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="bola.musa.adabize@email.com"
                  type="email"
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password" className="uppercase text-xs">
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Min 8 Characters"
                  type="password"
                />
                <InputGroupAddon>
                  <KeyRound />
                </InputGroupAddon>
              </InputGroup>
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
        className="mt-6 text-white w-full py-8 text-base "
        type="submit"
        form="signup-form"
      >
        Create Account
      </Button>
    </form>
  );
}
