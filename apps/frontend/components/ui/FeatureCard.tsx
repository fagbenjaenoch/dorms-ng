import { IconType } from "react-icons";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: IconType;
  iconBg: string;
}

export default function FeatureCard({
  title,
  description,
  Icon,
  iconBg,
}: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-3xl space-y-6">
      <div className={`w-14 h-14 grid place-items-center ${iconBg} rounded-2xl`}>
        <Icon className="shrink-0" size={20} />
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}
