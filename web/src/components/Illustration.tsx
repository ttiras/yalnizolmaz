import Image from "next/image";

type IllustrationProps = {
  name: string; // file name in public/illustrations without extension
  alt: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

export function Illustration({
  name,
  alt,
  caption,
  size = "md",
  className = "",
  priority = false,
}: IllustrationProps) {
  const src = `/illustrations/${name}.svg`;

  // Size configurations with different layouts
  const sizeConfig = {
    sm: "max-w-lg",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    full: "max-w-full",
  };

  const alignmentVariants = {
    sm: "mx-auto", // center small images
    md: Math.random() > 0.5 ? "ml-auto mr-0" : "mr-auto ml-0", // alternate sides for medium
    lg: "mx-auto", // center large images
    full: "mx-0", // full width
  };

  const maxW = sizeConfig[size as keyof typeof sizeConfig] || sizeConfig.md;
  const alignment =
    alignmentVariants[size as keyof typeof alignmentVariants] || alignmentVariants.md;

  return (
    <figure className={`not-prose my-12 w-full ${className} animate-fade-in-up`}>
      <div className={`relative mx-auto w-full`}>
        {/* Decorative background blur */}
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative aspect-[16/9] w-full bg-gradient-to-tr from-amber-100 to-orange-100 opacity-30 dark:from-amber-900 dark:to-orange-900 dark:opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className={`hover:shadow-3xl relative h-auto w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10 transition-all duration-700 hover:scale-[1.02] dark:ring-white/10`}
          priority={priority}
        />

        {/* Gradient overlay for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
      </div>

      {caption ? (
        <figcaption className="mx-auto mt-6 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-slate-600 italic dark:text-slate-400">
            {caption}
          </p>
          <div className="mx-auto mt-2 h-px w-16 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
        </figcaption>
      ) : null}
    </figure>
  );
}
