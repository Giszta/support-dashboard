const mockTickets = [
  {
    id: "TCK-1042",
    subject: "Billing issue after upgrade",
    status: "Open",
    priority: "High",
    assignee: "Sophie",
  },
  {
    id: "TCK-1041",
    subject: "Cannot reset password",
    status: "Pending",
    priority: "Medium",
    assignee: "Liam",
  },
  {
    id: "TCK-1040",
    subject: "Export to CSV fails",
    status: "Resolved",
    priority: "Low",
    assignee: "Emma",
  },
];

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Tickets
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Support tickets
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Podstawowy ekran listy, żeby osadzić przyszwe właściwe UI ticketów.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent tickets
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  ID
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Subject
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Priority
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Assignee
                </th>
              </tr>
            </thead>

            <tbody>
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-slate-100">
                  <td className="px-5 py-4 text-sm font-medium text-slate-900">
                    {ticket.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    {ticket.subject}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    {ticket.status}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    {ticket.priority}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    {ticket.assignee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
