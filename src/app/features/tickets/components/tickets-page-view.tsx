"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filterTickets, TicketFilters } from "../lib/filter-tickets";
import { getPageCount, paginateTickets } from "../lib/paginate-tickets";
import { sortTickets } from "../lib/sort-tickets";
import {
  buildTicketsQueryString,
  defaultTicketsQueryState,
  parseTicketsQueryState,
  TicketsQueryState,
} from "../lib/ticket-query-state";
import { TicketSort } from "../types/ticket-sort.types";
import { Ticket } from "../types/ticket.types";
import { TicketsFilters } from "./tickets-filters";
import { TicketsPagination } from "./tickets-pagination";
import { TicketsTable } from "./tickets-table";

type TicketsPageViewProps = {
  tickets: Ticket[];
};

const PAGE_SIZE = 8;

export function TicketsPageView({ tickets }: TicketsPageViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryState = useMemo(() => {
    return parseTicketsQueryState(searchParams);
  }, [searchParams]);

  const { filters, sort, page } = queryState;

  const hasActiveFilters =
    filters.query.trim().length > 0 ||
    filters.status !== "all" ||
    filters.priority !== "all";

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

  function updateQueryState(nextState: TicketsQueryState) {
    const queryString = buildTicketsQueryString({
      currentSearchParams: searchParams,
      nextState,
    });

    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(nextUrl);
  }

  function handleFiltersChange(nextFilters: TicketFilters) {
    updateQueryState({
      filters: nextFilters,
      sort,
      page: 1,
    });
  }

  function handleResetFilters() {
    updateQueryState({
      filters: defaultTicketsQueryState.filters,
      sort,
      page: 1,
    });
  }

  function handleSortChange(field: TicketSort["field"]) {
    const nextSort: TicketSort =
      sort.field === field
        ? {
            field,
            direction: sort.direction === "asc" ? "desc" : "asc",
          }
        : {
            field,
            direction: field === "createdAt" ? "desc" : "asc",
          };

    updateQueryState({
      filters,
      sort: nextSort,
      page: 1,
    });
  }

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount) {
      return;
    }

    updateQueryState({
      filters,
      sort,
      page: nextPage,
    });
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

      <TicketsFilters
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-medium text-zinc-900">
            {sortedTickets.length}
          </span>{" "}
          of <span className="font-medium text-zinc-900">{tickets.length}</span>{" "}
          tickets
        </p>

        <p className="text-sm text-zinc-500">
          Sorted by{" "}
          <span className="font-medium capitalize text-zinc-900">
            {sort.field === "createdAt" ? "created date" : sort.field}
          </span>{" "}
          (
          <span className="font-medium text-zinc-900">
            {sort.direction === "asc" ? "ascending" : "descending"}
          </span>
          )
        </p>
      </div>

      <TicketsTable
        tickets={paginatedTickets}
        sort={sort}
        onSortChange={handleSortChange}
        onClearFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
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
