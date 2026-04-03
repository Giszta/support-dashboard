export type TicketActivityType =
  | "created"
  | "comment"
  | "status_changed"
  | "assignment_changed"
  | "internal_note";

export type TicketActivity = {
  id: string;
  ticketId: string;
  type: TicketActivityType;
  author: string;
  createdAt: string;
  content: string;
};
