import Link from "next/link";
import { Button } from "./ui/button";

export default function CtaSection() {
  return (
    <section>
      <div className="container">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-primary overflow-hidden relative shadow-2xl shadow-primary/20 text-primary-foreground">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
          <div className="relative z-10 p-12 lg:p-20 text-center">
            <h2 className="text-4xl lg:text-6xl text-primary-light font-extrabold tracking-tighter mb-8 max-w-3xl mx-auto">
              Ready to Secure Your Dream Hostel?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/search" className="block w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="xl"
                  className="w-full rounded-2xl font-black text-lg shadow-xl transition-all"
                >
                  Find a Hostel Now
                </Button>
              </Link>
              <Button
                size="xl"
                className="w-full sm:w-auto text-primary-light bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black text-lg hover:bg-white/20 transition-all"
              >
                Talk to an Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
