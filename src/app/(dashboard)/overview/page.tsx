function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        <p className="text-sm font-medium text-emerald-600">{change}</p>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Support performance snapshot
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          To jest placeholder pod przyszły ekran przeglądowy dashboardu.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open tickets" value="128" change="+12%" />
        <StatCard label="Resolved today" value="43" change="+8%" />
        <StatCard label="Avg. first response" value="18 min" change="-5%" />
        <StatCard label="CSAT" value="94%" change="+2%" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Activity chart placeholder
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tutaj później dodam wykres aktywności zgłoszeń, np. liczba nowych i
            zamkniętych ticketów per dzień.
          </p>

          <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
            Chart area
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Team notes placeholder
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Miejsce na krótkie notatki operacyjne, SLA alerts lub informację o
            obciążeniu zespołu.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              Peak traffic expected between 12:00–15:00.
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              Two high-priority tickets still waiting for escalation.
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              CSAT improved after response template update.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
