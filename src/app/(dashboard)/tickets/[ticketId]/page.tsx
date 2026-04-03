import { notFound } from "next/navigation";
import { getTicketById } from "@/features/tickets/lib/get-ticket-by-id";
import { StatusBadge } from "@/features/tickets/components/status-badge";

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-500">{ticket.id}</p>
        <h1 className="text-2xl font-semibold text-zinc-950">
          {ticket.subject}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card label="Customer" value={ticket.customer} />
        <Card
          label="Status"
          value={
            <StatusBadge tone={getStatusTone(ticket.status)}>
              {formatLabel(ticket.status)}
            </StatusBadge>
          }
        />
        <Card
          label="Priority"
          value={
            <StatusBadge tone={getPriorityTone(ticket.priority)}>
              {formatLabel(ticket.priority)}
            </StatusBadge>
          }
        />
        <Card label="Assignee" value={ticket.assignee ?? "Unassigned"} />
        <Card label="Created" value={formatDate(ticket.createdAt)} />
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-900">Description</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          {ticket.description}
        </p>
      </section>
    </div>
  );
}

function Card({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <div className="mt-2 text-sm text-zinc-900">{value}</div>
    </div>
  );
}
