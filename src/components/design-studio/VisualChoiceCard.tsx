"use client";

import { SmartImage } from "@/components/SmartImage";

type Props = {
  selected?: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  meta?: string;
  imageSrc?: string;
  imageAlt?: string;
  multi?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
};

export function VisualChoiceCard({
  selected,
  onClick,
  title,
  description,
  meta,
  imageSrc,
  imageAlt,
  multi,
  priority,
  children,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`card card-hover group w-full overflow-hidden p-0 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
        selected ? "border-gold ring-2 ring-gold/35 shadow-[0_16px_40px_rgba(184,137,61,0.16)]" : ""
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-elevated">
        {imageSrc ? (
          <SmartImage
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="transition duration-500 group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : children ? (
          children
        ) : (
          <SmartImage src={null} alt={imageAlt || title} fill sizes="33vw" />
        )}

        <div
          className={`absolute bottom-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border text-sm shadow-sm ${
            selected
              ? "border-gold bg-gold text-white"
              : "border-white/80 bg-white/90 text-transparent"
          }`}
          aria-hidden
        >
          ✓
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold-deep">
          {title}
        </h3>
        {meta ? <p className="mt-1 text-sm font-medium text-gold-deep">{meta}</p> : null}
        {description ? <p className="mt-2 text-sm text-text-muted">{description}</p> : null}
        {multi && selected ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
            Selected
          </p>
        ) : null}
      </div>
    </button>
  );
}
