import { TicketActivity } from "../types/ticket-activity.types";

type ActivityTimelineProps = {
  items: TicketActivity[];
};

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function getActivityLabel(type: TicketActivity["type"]) {
  switch (type) {
    case "created":
      return "Created";
    case "comment":
      return "Public comment";
    case "status_changed":
      return "Status update";
    case "assignment_changed":
      return "Assignment";
    case "internal_note":
      return "Internal note";
    default:
      return "Activity";
  }
}

function getActivityTone(type: TicketActivity["type"]) {
  switch (type) {
    case "created":
      return "bg-blue-100";
    case "comment":
      return "bg-zinc-200";
    case "status_changed":
      return "bg-emerald-100";
    case "assignment_changed":
      return "bg-amber-100";
    case "internal_note":
      return "bg-violet-100";
    default:
      return "bg-zinc-200";
  }
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
        <p className="text-sm text-zinc-500">No activity yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-zinc-900">Activity</h2>

      <ol className="mt-5 space-y-5">
        {items.map((item) => (
          <li key={item.id} className="relative pl-8">
            <div className="absolute left-2 top-1 bottom-[-24px] w-px bg-zinc-200 last:hidden" />
            <div
              className={`absolute left-0 top-1 h-4 w-4 rounded-full border border-white ${getActivityTone(item.type)}`}
            />

            <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    {getActivityLabel(item.type)}
                  </p>
                  <p className="text-xs text-zinc-500">by {item.author}</p>
                </div>

                <p className="text-xs text-zinc-500">
                  {formatDateTime(item.createdAt)}
                </p>
              </div>

              <p className="text-sm leading-6 text-zinc-700">{item.content}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
