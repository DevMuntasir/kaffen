import Image from "next/image";
export function Photo({
  file,
  alt,
  className = "",
  priority = false,
  width = 900,
  height = 600,
}: {
  file: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={`/images/${file}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
