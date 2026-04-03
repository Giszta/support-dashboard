import { mockTickets } from "../data/mock-tickets";

export function getTicketById(id: string) {
  return mockTickets.find((ticket) => ticket.id === id) ?? null;
}
