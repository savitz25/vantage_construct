"use client";

type Props = {
  selected?: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  meta?: string;
  children?: React.ReactNode;
  multi?: boolean;
  className?: string;
};

export function OptionCard({
  selected,
  onClick,
  title,
  description,
  meta,
  children,
  multi,
  className = "",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`card card-hover group w-full p-0 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        selected ? "border-gold ring-1 ring-gold/40" : ""
      } ${className}`}
    >
      {children}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold-deep">
            {title}
          </h3>
          <span
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] ${
              selected
                ? "border-gold bg-gold text-white"
                : "border-border text-transparent"
            }`}
            aria-hidden
          >
            {multi ? (selected ? "✓" : "") : selected ? "✓" : ""}
          </span>
        </div>
        {meta ? <p className="mt-1 text-sm font-medium text-gold-deep">{meta}</p> : null}
        {description ? <p className="mt-2 text-sm text-text-muted">{description}</p> : null}
      </div>
    </button>
  );
}
