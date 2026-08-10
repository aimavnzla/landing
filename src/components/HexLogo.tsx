interface HexLogoProps {
  size?: number;
  className?: string;
}

export function HexLogo({ size = 36, className = "" }: HexLogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}aima-logo-icon.png`}
      alt="AIMA"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      loading="lazy"
    />
  );
}