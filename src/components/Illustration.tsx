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
  const maxW = size === "lg" ? "max-w-4xl" : size === "sm" ? "max-w-lg" : "max-w-2xl";
  return (
    <figure className={`not-prose my-8 ${className} animate-fade-in-up`}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className={`mx-auto h-auto w-full ${maxW} hover-lift rounded-lg transition-all duration-500 select-none hover:opacity-90`}
        priority={priority}
      />
      {caption ? (
        <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-500 italic dark:text-slate-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
