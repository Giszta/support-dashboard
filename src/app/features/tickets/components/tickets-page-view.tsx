"use client";

import { useMemo, useState } from "react";
import { Ticket } from "../types/ticket.types";
import { filterTickets, TicketFilters } from "../lib/filter-tickets";
import { TicketsFilters } from "./tickets-filters";
import { TicketsTable } from "./tickets-table";
import { TicketSort } from "../types/ticket-sort.types";
import { sortTickets } from "../lib/sort-tickets";
import { getPageCount, paginateTickets } from "../lib/paginate-tickets";
import { TicketsPagination } from "./tickets-pagination";

type TicketsPageViewProps = {
  tickets: Ticket[];
};

const initialFilters: TicketFilters = {
  query: "",
  status: "all",
  priority: "all",
};

const initialSort: TicketSort = {
  field: "createdAt",
  direction: "desc",
};

const PAGE_SIZE = 8;

export function TicketsPageView({ tickets }: TicketsPageViewProps) {
  const [filters, setFilters] = useState<TicketFilters>(initialFilters);
  const [sort, setSort] = useState<TicketSort>(initialSort);
  const [page, setPage] = useState(1);

  const filteredTickets = useMemo(() => {
    return filterTickets(tickets, filters);
  }, [tickets, filters]);

  const sortedTickets = useMemo(() => {
    return sortTickets(filteredTickets, sort);
  }, [filteredTickets, sort]);

  const pageCount = getPageCount(sortedTickets.length, PAGE_SIZE);

  const safePage = Math.min(page, pageCount);

  const paginatedTickets = useMemo(() => {
    return paginateTickets({
      tickets: sortedTickets,
      page: safePage,
      pageSize: PAGE_SIZE,
    });
  }, [sortedTickets, safePage]);

  function handleFiltersChange(nextFilters: TicketFilters) {
    setFilters(nextFilters);
    setPage(1);
  }

  function handleSortChange(field: TicketSort["field"]) {
    setSort((current) => {
      if (current.field === field) {
        return {
          field,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        field,
        direction: field === "createdAt" ? "desc" : "asc",
      };
    });

    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount) {
      return;
    }

    setPage(nextPage);
  }

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

      <TicketsFilters filters={filters} onChange={handleFiltersChange} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-medium text-zinc-900">
            {sortedTickets.length}
          </span>{" "}
          of <span className="font-medium text-zinc-900">{tickets.length}</span>{" "}
          tickets
        </p>
      </div>

      <TicketsTable
        tickets={paginatedTickets}
        sort={sort}
        onSortChange={handleSortChange}
      />

      {sortedTickets.length > 0 && (
        <TicketsPagination
          page={safePage}
          pageCount={pageCount}
          totalItems={sortedTickets.length}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
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
