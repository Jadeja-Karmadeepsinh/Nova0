import { cn } from "@/lib/utils";

/**
 * Props for {@link Nova0Logo}.
 *
 * @property className - Extra classes applied to the wrapper.
 * @property showWordmark - Whether to render the "nova0" text next to the mark.
 */
export type Nova0LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * The standalone Nova0 glyph (SVG mark) without the wordmark.
 *
 * Symmetrical 4-point celestial Nova star with an orbital slashed-zero core.
 * Inherits color via `currentColor` so it adapts to light and dark themes seamlessly.
 *
 * @param className - Extra classes applied to the `<svg>` element.
 */
export function Nova0Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* 4-point celestial Nova flare with negative-space zero cutout */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 16 2 C 16 9.8 22.2 16 30 16 C 22.2 16 16 22.2 16 30 C 16 22.2 9.8 16 2 16 C 9.8 16 16 9.8 16 2 Z M 16 11.2 A 4.8 4.8 0 1 0 16 20.8 A 4.8 4.8 0 1 0 16 11.2 Z"
        fill="currentColor"
      />
      {/* Precision 45-degree diagonal slash through the zero core */}
      <line
        x1="12.6"
        y1="19.4"
        x2="19.4"
        y2="12.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* 4 satellite diamond sparks representing generative intelligence */}
      <path
        d="M 8.5 7 L 9.8 8.5 L 8.5 10 L 7.2 8.5 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M 23.5 7 L 24.8 8.5 L 23.5 10 L 22.2 8.5 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M 8.5 22 L 9.8 23.5 L 8.5 25 L 7.2 23.5 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M 23.5 22 L 24.8 23.5 L 23.5 25 L 22.2 23.5 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * The Nova0 brand logo: the glyph mark plus an optional "nova0" wordmark.
 *
 * @param props - See {@link Nova0LogoProps}.
 */
export function Nova0Logo({
  className,
  showWordmark = true,
}: Nova0LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground select-none", className)}>
      <Nova0Mark className="h-7 w-auto" />
      {showWordmark ? (
        <span className="text-base font-semibold tracking-tight">
          nova<span className="font-mono text-muted-foreground ml-0.5">0</span>
        </span>
      ) : null}
    </span>
  );
}

// Backward-compatibility aliases
export { Nova0Logo as Chai0Logo, Nova0Mark as Chai0Mark };

