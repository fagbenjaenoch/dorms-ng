import SectionHeading from "./ui/SectionHeader";
import UniversityCard from "./ui/UniversityCard";

const popularUniversities = [
  {
    name: "University of Ilorin",
    imageUrl: "/unilorin.webp",
    slug: "unilorin",
  },
  { name: "University of Ibadan", imageUrl: "/ui.webp", slug: "ui" },
  { name: "University of Lagos", imageUrl: "/unilag.webp", slug: "unilag" },
  {
    name: "Federal University of Tehcnology, Akure",
    imageUrl: "/futa.webp",
    slug: "futa",
  },
];
export default function PopularUniversities() {
  return (
    <section className="bg-muted-foreground/10">
      <div className="container px-32">
        <SectionHeading label="Popular Universities" description="Destinations" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {popularUniversities.map((university, i) => (
            <UniversityCard
              name={university.name}
              imageUrl={university.imageUrl}
              slug={university.slug}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
