import SectionHeading from "./ui/SectionHeader";
import UniversityCard from "./ui/UniversityCard";

export default function PopularUniversities() {
  return (
    <section className="bg-muted-foreground/10">
      <div className="container px-32">
        <SectionHeading label="Popular Universities" description="Destinations" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <UniversityCard name="University of Ilorin" imageUrl="/unilorin.webp" />
          <UniversityCard name="University of Ibadan" imageUrl="/ui.webp" />
          <UniversityCard name="University of Lagos" imageUrl="/unilag.webp" />
          <UniversityCard
            name="Federal University of Technology, Akure"
            imageUrl="/futa.webp"
          />
        </div>
      </div>
    </section>
  );
}
