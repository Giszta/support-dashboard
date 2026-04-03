type TicketMetaCardProps = {
  label: string;
  value: React.ReactNode;
};

export function TicketMetaCard({ label, value }: TicketMetaCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <div className="mt-2 text-sm text-zinc-900">{value}</div>
    </div>
  );
}
