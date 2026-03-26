import BrandIcon from "@/components/ui/BrandIcon";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="block lg:flex *:flex-1 h-screen w-full">
      <div className="hidden lg:block bg-primary p-8">
        <Link href="/">
          <BrandIcon className="text-white" />
        </Link>
      </div>
      {children}
    </div>
  );
}
