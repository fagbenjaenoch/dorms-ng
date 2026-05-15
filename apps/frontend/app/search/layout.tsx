import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";

export const metadata = {
  title: "Search Results",
  description: "Search results for properties matching your criteria",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      {children}
    </div>
  );
}
