export function Sparkline({ series }: { series: number[] }) {
  const width = 60;
  const height = 20;
  const max = Math.max(...series, 1);
  const min = Math.min(...series, 0);
  const range = max - min || 1;
  const step = width / (series.length - 1 || 1);

  const coords = series.map((value, i) => ({
    x: i * step,
    y: height - ((value - min) / range) * height,
  }));
  const points = coords.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const last = coords[coords.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline points={points} />
      {last && <circle cx={last.x} cy={last.y} r={2} />}
    </svg>
  );
}
