import { Button } from "@/components/ui/button";
import Layout from "../Layout";
import Link from "next/link";

export default function Signin() {
  return (
    <Layout>
      <div className="p-16 text-foreground bg-background">
        <div>
          <p className="text-end">
            Don't have an account yet?{" "}
            <Button variant="link" className="text-base">
              <Link href="/auth/signup">Signup</Link>
            </Button>
          </p>
        </div>
      </div>
    </Layout>
  );
}
