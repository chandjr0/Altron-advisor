import logoMark from "@/assets/logo-mark.png";
import logoMarkLight from "@/assets/logo-mark-light.png";

type MarkProps = {
  className?: string;
  /** Use the light mark on dark / transparent hero nav. */
  light?: boolean;
};

/** Altrion Advisory logo mark (transparent background). */
export function Mark({ className = "", light = false }: MarkProps) {
  return (
    <img
      src={light ? logoMarkLight : logoMark}
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
