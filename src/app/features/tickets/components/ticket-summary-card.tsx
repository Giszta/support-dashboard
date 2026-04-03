type TicketSummaryCardProps = {
  title: string;
  children: React.ReactNode;
};

export function TicketSummaryCard({ title, children }: TicketSummaryCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
