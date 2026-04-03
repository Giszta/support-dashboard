type BadgeTone = "gray" | "blue" | "yellow" | "green" | "red";

const toneClasses: Record<BadgeTone, string> = {
  gray: "border-zinc-200 bg-zinc-100 text-zinc-700",
  blue: "border-blue-200 bg-blue-100 text-blue-700",
  yellow: "border-amber-200 bg-amber-100 text-amber-700",
  green: "border-emerald-200 bg-emerald-100 text-emerald-700",
  red: "border-red-200 bg-red-100 text-red-700",
};

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

export function StatusBadge({ children, tone = "gray" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
