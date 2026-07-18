export default function Progress({
  value,
  total,
  label,
}: {
  value: number;
  total: number;
  label: string;
}) {
  const pct = Math.round((value / total) * 100);
  return (
    <section className="progress" aria-label={label}>
      <div>
        <strong>{label}</strong>
        <span>{pct}%</span>
      </div>
      <progress value={value} max={total} />
    </section>
  );
}
