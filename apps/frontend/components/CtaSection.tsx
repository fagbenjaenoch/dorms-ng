import { Button } from "./ui/button";

export default function CtaSection() {
  return (
    <section>
      <div className="container">
        <div className="bg-primary text-[#cbffda] p-20 text-center space-y-8 rounded-4xl">
          <p className="font-bold text-3xl lg:text-4xl">
            Ready to Secure Your Dream Space?
          </p>

          <div className="flex gap-4 drop-shadow-xl justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="text-primary-foreground cursor-pointer"
            >
              Find a hostel now
            </Button>
            <Button
              size="xl"
              className="backdrop-blur-md ring-1 ring-[#cbffda]/30 bg-[#cbffda]/10 px-10 py-5 rounded-2xl cursor-pointer transition-all"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
