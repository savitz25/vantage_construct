import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { company } from "@/lib/company";

type Props = {
  /** header = compact nav mark+wordmark; footer = larger */
  variant?: "header" | "footer" | "mark";
  href?: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
};

/**
 * Official Vantage logo — transparent PNG, navy mark + wordmark.
 * Works on light cream site backgrounds.
 */
export function BrandLogo({
  variant = "header",
  href = "/",
  className = "",
  priority = false,
  onClick,
}: Props) {
  const sizes =
    variant === "footer"
      ? { width: 180, height: 120, className: "h-16 w-auto sm:h-[4.5rem]" }
      : variant === "mark"
        ? { width: 48, height: 48, className: "h-10 w-10" }
        : { width: 140, height: 96, className: "h-11 w-auto sm:h-12" };

  const img = (
    <Image
      src={brand.logo}
      alt={`${company.name} logo`}
      width={sizes.width}
      height={sizes.height}
      priority={priority}
      className={`${sizes.className} object-contain object-left`}
    />
  );

  if (!href) {
    return <span className={`inline-flex items-center ${className}`}>{img}</span>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center transition opacity-95 hover:opacity-100 ${className}`}
      aria-label={`${company.name} — Home`}
      onClick={onClick}
    >
      {img}
    </Link>
  );
}
