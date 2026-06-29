"use client";

import posthog from "posthog-js";
import { LoginData, loginSchema } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SigninPayload, APIResponse } from "@/lib/dto";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { KeyRound, MailIcon } from "lucide-react";

export default function SigninForm() {
  const router = useRouter();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (user: LoginData) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
          method: "POST",
          body: JSON.stringify(user),
        });
        let responseObj = (await res.json()) as APIResponse<SigninPayload>;
        if (!res.ok) throw new Error(responseObj.message);

        return responseObj;
      } catch (err: any) {
        toast.error(err.toString());
        console.error(err);
      }
    },
  });

  const onSubmit = async (data: LoginData) => {
    const payload = await mutation.mutateAsync(data);
    if (payload?.success) {
      posthog.identify(data.email, { email: data.email });
      posthog.capture("user_signed_in", { email: data.email });
      router.push("/app");
    }
  };

  return (
    <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className="uppercase text-xs">
                Email
              </FieldLabel>
              <InputGroup size="lg">
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
              <InputGroup size={"lg"}>
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
      </FieldGroup>
      <Button
        className="mt-6 text-white w-full py-8 text-base"
        onClick={form.handleSubmit(onSubmit)}
        form="signin-form"
      >
        Login
      </Button>
    </form>
  );
}
