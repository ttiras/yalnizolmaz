import Link from "next/link";
import { ContribTypeSlug } from "@/lib/contribConfig";

interface ContributionTypeCardProps {
  type: ContribTypeSlug;
  title: string;
  description: string;
  icon: string;
  color: string;
  count: number;
  href: string;
}

export function ContributionTypeCard({
  title,
  description,
  icon,
  color,
  count,
  href,
}: ContributionTypeCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{ 
        borderColor: "var(--border)", 
        backgroundColor: "var(--card)" 
      }}
    >
      <div className="relative p-6">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        />
        
        {/* Content */}
        <div className="relative">
          {/* Icon and count */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-4xl">{icon}</div>
            <div
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{ 
                backgroundColor: "var(--muted)", 
                color: "var(--muted-foreground)" 
              }}
            >
              {count} katkı
            </div>
          </div>

          {/* Title and description */}
          <h3 
            className="mb-2 text-xl font-semibold group-hover:opacity-80 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h3>
          <p 
            className="text-sm leading-relaxed group-hover:opacity-80 transition-opacity"
            style={{ color: "var(--muted-foreground)" }}
          >
            {description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-4 flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
            <span style={{ color: "var(--accent)" }}>Katkıda bulun →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
