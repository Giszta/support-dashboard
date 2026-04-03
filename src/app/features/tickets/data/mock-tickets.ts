import { Ticket } from "../types/ticket.types";

export const mockTickets: Ticket[] = [
  {
    id: "TCK-1001",
    subject: "Cannot reset password",
    customer: "Acme Inc.",
    status: "open",
    priority: "high",
    assignee: "Olivia Martin",
    createdAt: "2026-04-01T09:12:00Z",
    requesterEmail: "maria@acme.com",
    description:
      "User reports that password reset emails are not being received. The issue started after the latest deployment and affects multiple login attempts.",
  },
  {
    id: "TCK-1002",
    subject: "Billing invoice mismatch",
    customer: "Globex",
    status: "in_progress",
    priority: "urgent",
    assignee: "James Carter",
    createdAt: "2026-04-02T14:30:00Z",
    requesterEmail: "finance@globex.com",
    description:
      "Customer reports that the charged amount on the latest invoice does not match the agreed enterprise plan pricing.",
  },
  {
    id: "TCK-1003",
    subject: "Dashboard loads slowly",
    customer: "Soylent Corp",
    status: "resolved",
    priority: "medium",
    assignee: "Emma Wilson",
    createdAt: "2026-03-29T11:00:00Z",
    requesterEmail: "ops@soylent.com",
    description:
      "The analytics dashboard takes more than 12 seconds to render after login, especially for admin users with a larger dataset.",
  },
  {
    id: "TCK-1004",
    subject: "Cannot invite new team members",
    customer: "Initech",
    status: "open",
    priority: "medium",
    assignee: null,
    createdAt: "2026-04-03T08:45:00Z",
    requesterEmail: "hr@initech.com",
    description:
      "The invite flow fails on the final submission step and no invitation email is sent to newly added team members.",
  },
  {
    id: "TCK-1005",
    subject: "Export to CSV not working",
    customer: "Umbrella Ltd.",
    status: "closed",
    priority: "low",
    assignee: "Sophia Lee",
    createdAt: "2026-03-27T16:10:00Z",
    requesterEmail: "analyst@umbrella.com",
    description:
      "Customer cannot export filtered reports to CSV. The export button shows a loading state and then resets without generating a file.",
  },
  {
    id: "TCK-1006",
    subject: "2FA verification code delayed",
    customer: "Wayne Enterprises",
    status: "in_progress",
    priority: "high",
    assignee: "Noah Davis",
    createdAt: "2026-04-01T18:05:00Z",
    requesterEmail: "security@wayne.com",
    description:
      "Users report delayed delivery of 2FA codes via email, making login nearly impossible during peak usage hours.",
  },
];
