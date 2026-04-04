import { TicketFilters } from "./filter-tickets";
import { TicketPriority, TicketStatus } from "../types/ticket.types";
import {
  TicketSort,
  TicketSortDirection,
  TicketSortField,
} from "../types/ticket-sort.types";

export type TicketsQueryState = {
  filters: TicketFilters;
  sort: TicketSort;
  page: number;
};

const validStatuses: Array<TicketStatus> = [
  "open",
  "in_progress",
  "resolved",
  "closed",
];

const validPriorities: Array<TicketPriority> = [
  "low",
  "medium",
  "high",
  "urgent",
];

const validSortFields: Array<TicketSortField> = [
  "createdAt",
  "priority",
  "status",
];

const validSortDirections: Array<TicketSortDirection> = ["asc", "desc"];

export const defaultTicketsQueryState: TicketsQueryState = {
  filters: {
    query: "",
    status: "all",
    priority: "all",
  },
  sort: {
    field: "createdAt",
    direction: "desc",
  },
  page: 1,
};

function isValidStatus(value: string | null): value is TicketStatus {
  return value !== null && validStatuses.includes(value as TicketStatus);
}

function isValidPriority(value: string | null): value is TicketPriority {
  return value !== null && validPriorities.includes(value as TicketPriority);
}

function isValidSortField(value: string | null): value is TicketSortField {
  return value !== null && validSortFields.includes(value as TicketSortField);
}

function isValidSortDirection(
  value: string | null,
): value is TicketSortDirection {
  return (
    value !== null && validSortDirections.includes(value as TicketSortDirection)
  );
}

function parsePage(value: string | null): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export function parseTicketsQueryState(
  searchParams: ReadonlyURLSearchParams,
): TicketsQueryState {
  const query = searchParams.get("query") ?? "";
  const statusParam = searchParams.get("status");
  const priorityParam = searchParams.get("priority");
  const sortFieldParam = searchParams.get("sortField");
  const sortDirectionParam = searchParams.get("sortDirection");
  const pageParam = searchParams.get("page");

  return {
    filters: {
      query,
      status: isValidStatus(statusParam) ? statusParam : "all",
      priority: isValidPriority(priorityParam) ? priorityParam : "all",
    },
    sort: {
      field: isValidSortField(sortFieldParam)
        ? sortFieldParam
        : defaultTicketsQueryState.sort.field,
      direction: isValidSortDirection(sortDirectionParam)
        ? sortDirectionParam
        : defaultTicketsQueryState.sort.direction,
    },
    page: parsePage(pageParam),
  };
}

type BuildTicketsQueryStringParams = {
  currentSearchParams: ReadonlyURLSearchParams;
  nextState: TicketsQueryState;
};

export function buildTicketsQueryString({
  currentSearchParams,
  nextState,
}: BuildTicketsQueryStringParams): string {
  const params = new URLSearchParams(currentSearchParams.toString());

  const { filters, sort, page } = nextState;

  if (filters.query.trim()) {
    params.set("query", filters.query);
  } else {
    params.delete("query");
  }

  if (filters.status !== "all") {
    params.set("status", filters.status);
  } else {
    params.delete("status");
  }

  if (filters.priority !== "all") {
    params.set("priority", filters.priority);
  } else {
    params.delete("priority");
  }

  if (sort.field !== defaultTicketsQueryState.sort.field) {
    params.set("sortField", sort.field);
  } else {
    params.delete("sortField");
  }

  if (sort.direction !== defaultTicketsQueryState.sort.direction) {
    params.set("sortDirection", sort.direction);
  } else {
    params.delete("sortDirection");
  }

  if (page > 1) {
    params.set("page", String(page));
  } else {
    params.delete("page");
  }

  return params.toString();
}
