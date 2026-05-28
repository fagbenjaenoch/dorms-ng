import { FaBolt } from "react-icons/fa6";
import SectionHeading from "./SectionHeader";
import FeatureCard from "./FeatureCard";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { BiWallet } from "react-icons/bi";

export default function FeatureSection() {
  return (
    <section className="bg-muted-foreground/10">
      <div className="container pb-20">
        <SectionHeading
          label="Built for Nigerian Students"
          description="The Experience"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 lg:gap-4">
          <FeatureCard
            title="Strict Verification"
            description="No more 'ghost' properties. Every hostel listed
          undergoes a physical 24-point check by our
          campus ambassadors."
            Icon={RiVerifiedBadgeLine}
            iconBg="bg-fuchsia-500/20"
          />

          <FeatureCard
            title="Power & Water Audit"
            description="We provide real data on average daily electricity hours and water availability for every neighborhood"
            Icon={FaBolt}
            iconBg="bg-sky-300/50"
          />

          <FeatureCard
            title="Flexible Payments"
            description="Flexible Payments
         Access student-friendly payment plans and
         roommate-matching services to split costs
         effectively."
            Icon={BiWallet}
            iconBg="bg-amber-500/50"
          />
        </div>
      </div>
    </section>
  );
}
