"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { generateErrorMailLink } from "@/lib/utils/error";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{ fontFamily: "sans-serif" }}>
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <Button onClick={() => unstable_retry()}>Try again</Button>
          <p>
            Please{" "}
            <Link
              href={generateErrorMailLink({
                recipient: process.env.NEXT_PUBLIC_SUPPORT_MAIL!,
                subject: `Error on ${process.env.NEXT_PUBLIC_APP_NAME!}`,
                body: `[Please include a description of what you were doing when the error occurred]`,
              })}
              className="text-primary underline"
            >
              contact
            </Link>{" "}
            our support if the error persists
          </p>
        </div>
      </body>
    </html>
  );
}
