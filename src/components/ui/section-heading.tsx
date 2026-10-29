export function SectionHeading({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " section-heading--center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}
