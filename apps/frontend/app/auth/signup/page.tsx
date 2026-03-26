import { Button } from "@/components/ui/button";
import Layout from "../Layout";
import Link from "next/link";

export default function Signup() {
  return (
    <Layout>
      <div className="p-16 text-foreground bg-background">
        <div>
          <p className="text-end">
            Already have an account?{" "}
            <Button variant="link" className="text-base">
              <Link href="/auth/signin">Login</Link>
            </Button>
          </p>
        </div>
      </div>
    </Layout>
  );
}
