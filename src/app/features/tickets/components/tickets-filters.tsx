"use client";

import { TicketPriority, TicketStatus } from "../types/ticket.types";
import { TicketFilters } from "../lib/filter-tickets";

type TicketsFiltersProps = {
  filters: TicketFilters;
  onChange: (next: TicketFilters) => void;
};

export function TicketsFilters({ filters, onChange }: TicketsFiltersProps) {
  const update = <K extends keyof TicketFilters>(
    key: K,
    value: TicketFilters[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 md:flex-row md:items-center">
      <input
        value={filters.query}
        onChange={(e) => update("query", e.target.value)}
        placeholder="Search by ID, subject or customer..."
        className="h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 md:max-w-sm"
      />

      <select
        value={filters.status}
        onChange={(e) =>
          update("status", e.target.value as "all" | TicketStatus)
        }
        className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
      >
        <option value="all">All statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          update("priority", e.target.value as "all" | TicketPriority)
        }
        className="h-10 rounded-xl border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-400"
      >
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>
  );
}
