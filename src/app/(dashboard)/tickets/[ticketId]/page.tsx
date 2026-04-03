import { notFound } from "next/navigation";
import { ActivityTimeline } from "@/features/tickets/components/activity-timeline";
import { StatusBadge } from "@/features/tickets/components/status-badge";
import { TicketMetaCard } from "@/features/tickets/components/ticket-meta-card";
import { TicketSummaryCard } from "@/features/tickets/components/ticket-summary-card";
import { getTicketActivity } from "@/features/tickets/lib/get-ticket-activity";
import { getTicketById } from "@/features/tickets/lib/get-ticket-by-id";

type PageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function getStatusTone(status: string) {
  switch (status) {
    case "open":
      return "blue";
    case "in_progress":
      return "yellow";
    case "resolved":
      return "green";
    case "closed":
      return "gray";
    default:
      return "gray";
  }
}

function getPriorityTone(priority: string) {
  switch (priority) {
    case "low":
      return "gray";
    case "medium":
      return "blue";
    case "high":
      return "yellow";
    case "urgent":
      return "red";
    default:
      return "gray";
  }
}

export default async function TicketDetailsPage({ params }: PageProps) {
  const { ticketId } = await params;
  const ticket = getTicketById(ticketId);

  if (!ticket) {
    notFound();
  }

  const activity = getTicketActivity(ticket.id);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Ticket details
        </p>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-zinc-500">{ticket.id}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
              {ticket.subject}
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-zinc-600">
              Review ticket context, customer details, and activity history.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={getStatusTone(ticket.status)}>
              {formatLabel(ticket.status)}
            </StatusBadge>

            <StatusBadge tone={getPriorityTone(ticket.priority)}>
              {formatLabel(ticket.priority)}
            </StatusBadge>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_380px]">
        <div className="space-y-6">
          <TicketSummaryCard title="Description">
            <p className="text-sm leading-7 text-zinc-700">
              {ticket.description}
            </p>
          </TicketSummaryCard>

          <ActivityTimeline items={activity} />
        </div>

        <aside className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <TicketMetaCard label="Customer" value={ticket.customer} />
            <TicketMetaCard
              label="Requester email"
              value={ticket.requesterEmail}
            />
            <TicketMetaCard
              label="Assignee"
              value={ticket.assignee ?? "Unassigned"}
            />
            <TicketMetaCard
              label="Created"
              value={formatDate(ticket.createdAt)}
            />
          </div>

          <TicketSummaryCard title="Internal note">
            <p className="text-sm leading-6 text-zinc-700">
              This is currently a read-only mock section for the MVP detail
              screen. In a real application, this would include a form to submit
              new notes
            </p>
          </TicketSummaryCard>
        </aside>
      </div>
    </div>
  );
}
