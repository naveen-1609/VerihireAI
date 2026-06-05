import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-white p-6 transition-all hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent-teal/10 text-accent transition-transform group-hover:scale-105">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
