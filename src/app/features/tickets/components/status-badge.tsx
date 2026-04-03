type BadgeTone = "gray" | "blue" | "yellow" | "green" | "red";

const toneClasses: Record<BadgeTone, string> = {
  gray: "bg-zinc-100 text-zinc-700 border-zinc-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

export function StatusBadge({ children, tone = "gray" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
