import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/ui/Footer";

export default function Page() {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      <div className="container leading-relaxed">
        <div className="mb-20">
          <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter mb-10">
            Our <span className="text-primary">Story</span>
          </h1>
        </div>
        <section>
          <p className="mb-8">
            Finding a decent hostel on-campus or off-campus shouldn't be left to chance.
          </p>

          <p className="mb-8">
            For years, Nigerian students have had to navigate a broken housing market. You
            know the drill: trekking for hours under the sun, dealing with sketchy agents,
            paying non-refundable "inspection fees," and showing up to a property only to
            realize the photos you saw online were taken five years age, or worse, stolen
            from the internet.
          </p>
          <p className="mb-8">We built Dorms.ng to fix this.</p>

          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">
            What We Do
          </h2>
          <p className="mb-8">
            We are not landlords, and we are not a traditional real estate agency.
            Dorms.ng is a dedicated discovery and verification platform built specifically
            for Nigerian students.
          </p>
          <p className="mb-8">
            We exist to answer two simple questions: What hostels are actually available
            near my campus? and Are they legitimate?
          </p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">
            Our Promise: The Verification Layer
          </h2>
          <p className="mb-8">
            Anyone can post a picture of a room online. At Dorms.ng, we do the legwork so
            you don't have to. When you see our Verified badge on a listing, it means our
            team has physically visited that property. We've checked the water, confirmed
            the security, and verified that the person claiming to rent it out actually
            has the authority to do so.
          </p>
          <p className="mb-8">
            Our mission is simple: to bring absolute transparency, safety, and peace of
            mind to both on-campus and off-campus student housing. No scams. No fake
            pictures. Just real hostels for real students.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
