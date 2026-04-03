import { Ticket, TicketPriority, TicketStatus } from "../types/ticket.types";

export type TicketFilters = {
  query: string;
  status: "all" | TicketStatus;
  priority: "all" | TicketPriority;
};

export function filterTickets(
  tickets: Ticket[],
  filters: TicketFilters,
): Ticket[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return tickets.filter((ticket) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      ticket.id.toLowerCase().includes(normalizedQuery) ||
      ticket.subject.toLowerCase().includes(normalizedQuery) ||
      ticket.customer.toLowerCase().includes(normalizedQuery);

    const matchesStatus =
      filters.status === "all" || ticket.status === filters.status;

    const matchesPriority =
      filters.priority === "all" || ticket.priority === filters.priority;

    return matchesQuery && matchesStatus && matchesPriority;
  });
}
