import { Button } from "@/components/ui/button";
import Layout from "../Layout";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import SigninForm from "@/components/SigninForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function Signin() {
  return (
    <Layout>
      <div className="p-16 text-foreground">
        <p className="text-end">
          Don't have an account yet?{" "}
          <Button variant="link" className="text-base">
            <Link href="/auth/signup">Signup</Link>
          </Button>
        </p>
        <div>
          <div className="max-w-2xl mx-auto">
            <h1 className="mt-20 mb-8 font-sans text-3xl lg:text-4xl tracking-tighter font-extrabold">
              Find hostels with{" "}
              <span className="text-secondary">peace of mind.</span>
            </h1>
            <Button variant="outline" className="w-full py-6 text-base">
              <div className="flex items-center gap-4">
                <FaGoogle /> Continue with Google
              </div>
            </Button>
            <div className="grid grid-cols-3 items-center text-center my-10">
              <hr className="border-gray-200" />
              <span className="uppercase font-bold text-xs text-gray-600">
                Or login with email
              </span>
              <hr className="border-gray-200" />
            </div>
            <SigninForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
