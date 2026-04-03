const mockCustomers = [
  {
    name: "Acme Inc.",
    segment: "Enterprise",
    openTickets: 12,
    health: "At risk",
  },
  {
    name: "Orbit Labs",
    segment: "SMB",
    openTickets: 3,
    health: "Stable",
  },
  {
    name: "Nova Commerce",
    segment: "Mid-market",
    openTickets: 7,
    health: "Watchlist",
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Customers
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Customer accounts
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          To jest pomocniczy ekran placeholder.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockCustomers.map((customer) => (
          <article
            key={customer.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {customer.name}
            </h2>

            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-4">
                <dt>Segment</dt>
                <dd className="font-medium text-slate-900">
                  {customer.segment}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt>Open tickets</dt>
                <dd className="font-medium text-slate-900">
                  {customer.openTickets}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt>Health</dt>
                <dd className="font-medium text-slate-900">
                  {customer.health}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
