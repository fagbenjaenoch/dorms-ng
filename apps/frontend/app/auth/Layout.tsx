import BrandIcon from "@/components/ui/BrandIcon";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="block lg:flex *:flex-1 h-screen w-full">
      <div className="hidden lg:block overflow-hidden bg-primary p-8 max-w-3xl">
        <Link href="/">
          <BrandIcon className="text-white font-bold" variant="orange" />
        </Link>
      </div>
      <div className="bg-muted-foreground/10 pb-24 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
