import Image from "next/image";

type UserAvatarProps = {
  src?: string | null;
  name?: string | null;
  email?: string | null;
  size?: number;
  className?: string;
};

// Server component: purely presentational avatar with graceful fallback
export default function UserAvatar({ src, name, email, size = 32, className }: UserAvatarProps) {
  const dimension = size;
  const displayChar = (name || email || "?").trim().charAt(0).toUpperCase();

  if (src) {
    return (
      <span
        className={
          "inline-flex items-center justify-center overflow-hidden rounded-full border bg-neutral-200 dark:bg-neutral-900 " +
          (className || "")
        }
        style={{ width: dimension, height: dimension, lineHeight: 0, borderColor: "var(--border)" }}
      >
        <Image
          src={src}
          alt={name || email || "Kullanıcı"}
          width={dimension}
          height={dimension}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={
        "inline-flex items-center justify-center overflow-hidden rounded-full border text-neutral-700 dark:text-neutral-200 " +
        (className || "")
      }
      style={{
        width: dimension,
        height: dimension,
        fontSize: Math.max(12, Math.floor(dimension * 0.45)),
        borderColor: "var(--border)",
      }}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-fuchsia-400 to-blue-400 dark:from-fuchsia-700 dark:to-blue-700" />
      <span className="relative z-10 font-semibold text-white mix-blend-overlay">
        {displayChar}
      </span>
    </span>
  );
}
