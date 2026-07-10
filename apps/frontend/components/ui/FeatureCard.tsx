import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  Icon,
  iconBg,
  className,
}: FeatureCardProps) {
  return (
    <div className={cn(`bg-white p-8 rounded-3xl space-y-3 lg:space-y-6`, className)}>
      <div className={`w-14 h-14 grid place-items-center ${iconBg} rounded-2xl`}>
        {Icon}
      </div>
      <h3 className="font-bold md:text-xl">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}
