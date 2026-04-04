import { Ticket } from "../types/ticket.types";

type PaginateTicketsParams = {
  tickets: Ticket[];
  page: number;
  pageSize: number;
};

export function paginateTickets({
  tickets,
  page,
  pageSize,
}: PaginateTicketsParams): Ticket[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return tickets.slice(start, end);
}

export function getPageCount(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
