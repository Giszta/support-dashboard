"use client";

import { useEffect, useState } from "react";
import { TicketFilters } from "../lib/filter-tickets";
import { TicketPriority, TicketStatus } from "../types/ticket.types";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";

type TicketsFiltersProps = {
  filters: TicketFilters;
  onChange: (next: TicketFilters) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
};

export function TicketsFilters({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: TicketsFiltersProps) {
  const update = <K extends keyof TicketFilters>(
    key: K,
    value: TicketFilters[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <DebouncedSearchInput
            key={filters.query}
            initialValue={filters.query}
            onDebouncedChange={(nextQuery) => update("query", nextQuery)}
          />

          <label className="sr-only" htmlFor="tickets-status">
            Filter by status
          </label>
          <select
            id="tickets-status"
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

          <label className="sr-only" htmlFor="tickets-priority">
            Filter by priority
          </label>
          <select
            id="tickets-priority"
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

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}

type DebouncedSearchInputProps = {
  initialValue: string;
  onDebouncedChange: (value: string) => void;
};

function DebouncedSearchInput({
  initialValue,
  onDebouncedChange,
}: DebouncedSearchInputProps) {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebouncedValue(value, 400);

  useEffect(() => {
    if (debouncedValue !== initialValue) {
      onDebouncedChange(debouncedValue);
    }
  }, [debouncedValue, initialValue, onDebouncedChange]);

  return (
    <>
      <label className="sr-only" htmlFor="tickets-search">
        Search tickets
      </label>
      <input
        id="tickets-search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by ID, subject or customer..."
        className="h-10 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 md:max-w-sm"
      />
    </>
  );
}
