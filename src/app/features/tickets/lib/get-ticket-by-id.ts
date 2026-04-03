import { mockTickets } from "../data/mock-tickets";

export function getTicketById(id: string) {
  return mockTickets.find((t) => t.id === id) || null;
}
