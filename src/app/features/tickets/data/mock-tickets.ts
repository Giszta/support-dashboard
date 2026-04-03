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
    description:
      "Customer reports that they are unable to reset their password using the 'Forgot Password' feature. They receive an error message after submitting their email address. Please investigate and resolve this issue as soon as possible.",
  },
  {
    id: "TCK-1002",
    subject: "Billing invoice mismatch",
    customer: "Globex",
    status: "in_progress",
    priority: "urgent",
    assignee: "James Carter",
    createdAt: "2026-04-02T14:30:00Z",
    description:
      "Customer has reported that the invoice they received does not match the amount they were expecting. They were charged $150 instead of $100 for their subscription. Please review their billing history and correct any discrepancies.",
  },
  {
    id: "TCK-1003",
    subject: "Dashboard loads slowly",
    customer: "Soylent Corp",
    status: "resolved",
    priority: "medium",
    assignee: "Emma Wilson",
    createdAt: "2026-03-29T11:00:00Z",
    description:
      "Customer has reported that the dashboard takes a long time to load, especially when accessing the analytics section. They are using the latest version of the app on a stable internet connection. Please investigate potential performance issues and optimize the loading times.",
  },
  {
    id: "TCK-1004",
    subject: "Cannot invite new team members",
    customer: "Initech",
    status: "open",
    priority: "medium",
    assignee: null,
    createdAt: "2026-04-03T08:45:00Z",
    description:
      "Customer is trying to invite new team members to their account but receives an error message saying 'Invitation failed. Please try again later.' They have attempted this multiple times with different email addresses. Please investigate the issue and provide a solution.",
  },
  {
    id: "TCK-1005",
    subject: "Export to CSV not working",
    customer: "Umbrella Ltd.",
    status: "closed",
    priority: "low",
    assignee: "Sophia Lee",
    createdAt: "2026-03-27T16:10:00Z",
    description:
      "Customer has reported that the 'Export to CSV' feature is not working. When they click the export button, nothing happens and no file is downloaded. They have tried this on multiple browsers with the same result. Please investigate and fix this issue.",
  },
  {
    id: "TCK-1006",
    subject: "2FA verification code delayed",
    customer: "Wayne Enterprises",
    status: "in_progress",
    priority: "high",
    assignee: "Noah Davis",
    createdAt: "2026-04-01T18:05:00Z",
    description:
      "Customer has reported that the 2FA verification code is delayed by several minutes, causing them to be locked out of their account. They have tried resending the code multiple times, but it still takes a long time to arrive. Please investigate potential issues with the 2FA system and resolve this as soon as possible.",
  },
];
