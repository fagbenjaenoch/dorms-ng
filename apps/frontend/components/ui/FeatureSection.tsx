import { FaBolt } from "react-icons/fa6";
import SectionHeading from "./SectionHeader";
import FeatureCard from "./FeatureCard";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { BiWallet } from "react-icons/bi";

export default function FeatureSection() {
  return (
    <section className="bg-muted-foreground/10">
      <div className="container pb-20">
        <SectionHeading label="Built for Nigerian Students" description="The Audience" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 lg:gap-4">
          <FeatureCard
            title="Physically Inspected"
            description="Real humans visit the property before it gets verified."
            Icon={<RiVerifiedBadgeLine className="shrink-0" size={20} />}
            iconBg="bg-fuchsia-500/20"
          />

          <FeatureCard
            title="Scam-Proof"
            description="We vet landlords and agents to protect your money."
            Icon={<BiWallet className="shrink-0" size={20} />}
            iconBg="bg-sky-300/50"
          />

          <FeatureCard
            title="Accurate Amenities"
            description="If we say there's running water, there is running water."
            Icon={<FaBolt className="shrink-0" size={20} />}
            iconBg="bg-amber-500/50"
          />
        </div>
      </div>
    </section>
  );
}
