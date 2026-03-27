import { Button } from "@/components/ui/button";
import Layout from "../Layout";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import SignupForm from "@/components/SignupForm";

export default function Signup() {
  return (
    <Layout>
<<<<<<< HEAD
      <div className="p-16 text-foreground bg-background">
        <div>
          <p className="text-end">
            Already have an account?{" "}
            <Button variant="link" className="text-base">
              <Link href="/auth/signin">Login</Link>
            </Button>
          </p>
=======
      <div className="p-16 text-foreground">
        <p className="text-end">
          Already have an account?{" "}
          <Button variant="link" className="text-base">
            <Link href="/auth/signin">Login</Link>
          </Button>
        </p>
        <div className="max-w-2xl mx-auto">
>>>>>>> 20f069b (created signup page)
          <h1 className="mt-20 mb-8 font-sans text-3xl lg:text-4xl tracking-tighter font-extrabold">
            Find hostels with <span className="text-secondary">peace of mind.</span>
          </h1>
          <Button variant="outline" className="cursor-pointer w-full py-6 text-base">
            <div className="flex items-center gap-4">
              <FaGoogle /> Continue with Google
            </div>
          </Button>
          <div className="grid grid-cols-3 items-center text-center my-10">
            <hr className="border-gray-200" />
<<<<<<< HEAD
            <span className="uppercase font-bold text-xs text-gray-800">
=======
            <span className="uppercase font-bold text-xs text-gray-600">
>>>>>>> 20f069b (created signup page)
              Or register with email
            </span>
            <hr className="border-gray-200" />
          </div>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
}
