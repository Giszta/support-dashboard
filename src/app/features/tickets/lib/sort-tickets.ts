import { Ticket } from "../types/ticket.types";
import { TicketSort } from "../types/ticket-sort.types";

const priorityRank: Record<Ticket["priority"], number> = {
  low: 0,
  medium: 1,
  high: 2,
  urgent: 3,
};

const statusRank: Record<Ticket["status"], number> = {
  open: 0,
  in_progress: 1,
  resolved: 2,
  closed: 3,
};

export function sortTickets(tickets: Ticket[], sort: TicketSort): Ticket[] {
  const sorted = [...tickets];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sort.field) {
      case "createdAt": {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      }

      case "priority": {
        comparison = priorityRank[a.priority] - priorityRank[b.priority];
        break;
      }

      case "status": {
        comparison = statusRank[a.status] - statusRank[b.status];
        break;
      }

      default: {
        comparison = 0;
      }
    }

    return sort.direction === "asc" ? comparison : -comparison;
  });

  return sorted;
}
