"use client";

interface ExternalLinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLinkButton({ href, children, className = "" }: ExternalLinkButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <span 
      className={`flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
    </span>
  );
}
