"use client";

import { useMemo, useState } from "react";
import { Ticket } from "../types/ticket.types";
import { filterTickets, TicketFilters } from "../lib/filter-tickets";
import { TicketsFilters } from "./tickets-filters";
import { TicketsTable } from "./tickets-table";

type TicketsPageViewProps = {
  tickets: Ticket[];
};

const initialFilters: TicketFilters = {
  query: "",
  status: "all",
  priority: "all",
};

export function TicketsPageView({ tickets }: TicketsPageViewProps) {
  const [filters, setFilters] = useState<TicketFilters>(initialFilters);

  const filteredTickets = useMemo(() => {
    return filterTickets(tickets, filters);
  }, [tickets, filters]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Tickets
        </h1>
        <p className="text-sm text-zinc-500">
          Monitor incoming issues, filter queues, and track ticket progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard label="Total tickets" value={tickets.length} />
        <MetricCard
          label="Open"
          value={tickets.filter((t) => t.status === "open").length}
        />
        <MetricCard
          label="Urgent"
          value={tickets.filter((t) => t.priority === "urgent").length}
        />
      </div>

      <TicketsFilters filters={filters} onChange={setFilters} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-medium text-zinc-900">
            {filteredTickets.length}
          </span>{" "}
          of <span className="font-medium text-zinc-900">{tickets.length}</span>{" "}
          tickets
        </p>
      </div>

      <TicketsTable tickets={filteredTickets} />
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-950">{value}</p>
    </div>
  );
}
