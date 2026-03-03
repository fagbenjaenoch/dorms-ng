import Image from "next/image";

interface UniversityCardProps {
  name: string;
  imageUrl: string;
}

export default function UniversityCard({ name, imageUrl }: UniversityCardProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden hover-group cursor-pointer">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="relative hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black opacity-70 to-transparent bottom-0"></div>
      <p className="absolute bottom-0 text-white text-xl font-bold p-4 leading-5">
        {name}
      </p>
    </div>
  );
}
