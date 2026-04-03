import { TicketsPageView } from "@/features/tickets/components/tickets-page-view";
import { mockTickets } from "@/features/tickets/data/mock-tickets";

export default function TicketsPage() {
  return <TicketsPageView tickets={mockTickets} />;
}
