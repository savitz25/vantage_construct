"use client";

import Image from "next/image";

type Props = {
  selected?: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  meta?: string;
  imageSrc?: string;
  imageAlt?: string;
  multi?: boolean;
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
  children,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`card card-hover group w-full overflow-hidden p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
        selected ? "border-gold ring-1 ring-gold/40" : ""
      }`}
    >
      {imageSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : children ? (
        children
      ) : null}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold-deep">
            {title}
          </h3>
          <span
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] ${
              selected ? "border-gold bg-gold text-white" : "border-border text-transparent"
            }`}
            aria-hidden
          >
            {selected ? "✓" : multi ? "" : ""}
          </span>
        </div>
        {meta ? <p className="mt-1 text-sm font-medium text-gold-deep">{meta}</p> : null}
        {description ? <p className="mt-2 text-sm text-text-muted">{description}</p> : null}
      </div>
    </button>
  );
}
