interface SectionHeadingProps {
  label: string;
  description: string;
}

export default function SectionHeading({ label, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col mb-12">
      <span className="tracking-wider uppercase text-secondary text-sm font-semibold lg:text-base">
        {description}
      </span>
      <h2 className="tracking-tighter text-2xl lg:text-4xl font-bold">{label}</h2>
    </div>
  );
}
