import Link from "next/link";
import { Ticket } from "../types/ticket.types";
import { StatusBadge } from "./status-badge";
import { TicketSort, TicketSortField } from "../types/ticket-sort.types";

type TicketsTableProps = {
  tickets: Ticket[];
  sort: TicketSort;
  onSortChange: (field: TicketSortField) => void;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function getStatusTone(status: Ticket["status"]) {
  switch (status) {
    case "open":
      return "blue";
    case "in_progress":
      return "yellow";
    case "resolved":
      return "green";
    case "closed":
      return "gray";
    default:
      return "gray";
  }
}

function getPriorityTone(priority: Ticket["priority"]) {
  switch (priority) {
    case "low":
      return "gray";
    case "medium":
      return "blue";
    case "high":
      return "yellow";
    case "urgent":
      return "red";
    default:
      return "gray";
  }
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function SortButton({
  label,
  field,
  activeField,
  direction,
  onClick,
}: {
  label: string;
  field: TicketSortField;
  activeField: TicketSortField;
  direction: TicketSort["direction"];
  onClick: (field: TicketSortField) => void;
}) {
  const isActive = field === activeField;

  return (
    <button
      type="button"
      onClick={() => onClick(field)}
      className="inline-flex items-center gap-1 font-medium text-zinc-500 transition hover:text-zinc-900"
    >
      <span>{label}</span>
      <span className="text-xs text-zinc-400">
        {isActive ? (direction === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </button>
  );
}

export function TicketsTable({
  tickets,
  sort,
  onSortChange,
}: TicketsTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center">
        <h3 className="text-base font-semibold text-zinc-900">
          No tickets found
        </h3>
        <p className="mt-2 text-sm text-zinc-500">
          Try changing filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr className="text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3 font-medium">Ticket</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">
                <SortButton
                  label="Status"
                  field="status"
                  activeField={sort.field}
                  direction={sort.direction}
                  onClick={onSortChange}
                />
              </th>
              <th className="px-4 py-3 font-medium">
                <SortButton
                  label="Priority"
                  field="priority"
                  activeField={sort.field}
                  direction={sort.direction}
                  onClick={onSortChange}
                />
              </th>
              <th className="px-4 py-3 font-medium">Assignee</th>
              <th className="px-4 py-3 font-medium">
                <SortButton
                  label="Created"
                  field="createdAt"
                  activeField={sort.field}
                  direction={sort.direction}
                  onClick={onSortChange}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50/80"
              >
                <td className="px-4 py-4">
                  <Link
                    href={`/tickets/${ticket.id}`}
                    className="flex flex-col rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-300"
                  >
                    <span className="text-xs font-medium text-zinc-500">
                      {ticket.id}
                    </span>
                    <span className="text-sm font-medium text-zinc-900 hover:underline">
                      {ticket.subject}
                    </span>
                  </Link>
                </td>

                <td className="px-4 py-4 text-sm text-zinc-700">
                  {ticket.customer}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge tone={getStatusTone(ticket.status)}>
                    {formatLabel(ticket.status)}
                  </StatusBadge>
                </td>

                <td className="px-4 py-4">
                  <StatusBadge tone={getPriorityTone(ticket.priority)}>
                    {formatLabel(ticket.priority)}
                  </StatusBadge>
                </td>

                <td className="px-4 py-4 text-sm text-zinc-700">
                  {ticket.assignee ?? "Unassigned"}
                </td>

                <td className="px-4 py-4 text-sm text-zinc-500">
                  {formatDate(ticket.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
