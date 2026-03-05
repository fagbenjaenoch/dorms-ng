import UniversityCard from "./ui/UniversityCard";

export default function PopularUniversities() {
  return (
    <section>
      <div className="container px-32">
        <h2>Popular Universities</h2>
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
