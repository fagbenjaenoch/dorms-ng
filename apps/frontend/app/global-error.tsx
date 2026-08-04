"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
              href={`mailto:fagbenjaenoch73@gmail.com?subject=Error%20on%20Hostel%20Marketplace%20App&body=Please%20include%20a%20description%20of%20what%20you%20were%20doing%20when%20the%20error%20occurred`}
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
