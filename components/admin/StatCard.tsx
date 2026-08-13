export default function StatCard({
  label,
  value,
  accent = "blue",
}: {
  label: string;
  value: number;
  accent?: "blue" | "green" | "yellow" | "red";
}) {
  const accents: Record<string, string> = {
    blue: "from-blue-500/15 text-blue-700 border-blue-100",
    green: "from-cameroon-green/15 text-emerald-700 border-emerald-100",
    yellow: "from-cameroon-yellow/25 text-amber-700 border-amber-100",
    red: "from-cameroon-red/15 text-red-700 border-red-100",
  };

  return (
    <div className={`surface-card border p-5 bg-gradient-to-br ${accents[accent]} to-white`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
