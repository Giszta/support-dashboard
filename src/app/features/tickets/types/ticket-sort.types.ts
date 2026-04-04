export type TicketSortField = "createdAt" | "priority" | "status";
export type TicketSortDirection = "asc" | "desc";

export type TicketSort = {
  field: TicketSortField;
  direction: TicketSortDirection;
};
