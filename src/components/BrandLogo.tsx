import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { company } from "@/lib/company";

type Props = {
  /** header = compact nav; footer = larger plate; mark = square icon only */
  variant?: "header" | "footer" | "mark";
  href?: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
};

/**
 * Official Vantage logo — transparent PNG with navy mark + full
 * “VANTAGE CONSTRUCTION” wordmark (stacked).
 */
export function BrandLogo({
  variant = "header",
  href = "/",
  className = "",
  priority = false,
  onClick,
}: Props) {
  // Intrinsic ratio ≈ 851×518 (w/h ≈ 1.64) for full logo
  const config =
    variant === "footer"
      ? {
          src: brand.logo,
          width: 200,
          height: 122,
          className: "h-[4.25rem] w-auto sm:h-[4.75rem]",
        }
      : variant === "mark"
        ? {
            src: brand.mark,
            width: 48,
            height: 48,
            className: "h-10 w-10",
          }
        : {
            src: brand.logo,
            width: 168,
            height: 102,
            className: "h-11 w-auto sm:h-[3.15rem]",
          };

  const img = (
    <Image
      src={config.src}
      alt={`${company.name} logo`}
      width={config.width}
      height={config.height}
      priority={priority}
      className={`${config.className} object-contain object-left`}
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
