import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>
      <main className="grow flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          <div className="relative mb-8">
            <h1 className="text-[12rem] bg-clip-text leading-52 text-transparent bg-linear-to-b from-primary-light to-primary-light/40 to-90% md:text-[16rem] font-black text-linear select-none">
              Coming Soon
            </h1>
          </div>
          <p>
            We are working on this feature and we want the best experience for you. Keep
            an eye out for it.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
