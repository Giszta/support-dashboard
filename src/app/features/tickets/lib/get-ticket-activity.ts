import { mockTicketActivity } from "../data/mock-ticket-activity";

export function getTicketActivity(ticketId: string) {
  return mockTicketActivity
    .filter((item) => item.ticketId === ticketId)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
