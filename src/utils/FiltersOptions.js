import { MessageRounded as MessageRoundedIcon, CheckCircleOutlineRounded, CircleNotifications as CircleIcon, ChangeCircleRounded, FiberNewRounded, AccessTimeRounded, PersonRounded, AssignmentRounded } from "@mui/icons-material";

export const TICKET_FILTER_DEFINITIONS = {
  status: {
    title: "Status",
    options: [
      { label: "Open", color: "#2196F3" },
      { label: "Resolved", color: "#4CAF50" },
      { label: "Closed", color: "#9E9E9E" },
    ],
  },
  priority: {
    title: "Priority",
    options: [
      { label: "Critical", color: "#D32F2F" },
      { label: "High", color: "#F57C00" },
    ],
  },
  // ... add all other categories here ...
  category: {
    title: "Category",
    options: [
      { label: "Technical Issue", color: "#5E35B1" },
      { label: "Billing", color: "#00897B" },
    ],
  },
};
// Assumed Icon-Color mapping for Call Log statuses
const CALL_LOG_COLORS = {
  // Call Types
  Incoming: "#3B82F6", // Blue
  Outgoing: "#22C55E", // Green
  Missed: "#EF4444", // Red

  // External Statuses (from your original getStatusColor logic)
  Tracking: "#991b1b",
  New: "#075985",
  Solved: "#166534",
  Review: "#9a3412",
  ConversationPending: "#4b5563",
};

export const CALL_LOG_FILTER_DEFINITIONS = {
  callType: {
    title: "Call Type",
    options: [
      { label: "Incoming", color: CALL_LOG_COLORS.Incoming },
      { label: "Outgoing", color: CALL_LOG_COLORS.Outgoing },
    ],
  },
  externalStatus: {
    title: "External Status",
    options: [
      { label: "New request", color: CALL_LOG_COLORS.New },
      { label: "Ticket generated", color: CALL_LOG_COLORS.New },
      { label: "Under Tracking", color: CALL_LOG_COLORS.Tracking },
      { label: "Conversation pending", color: CALL_LOG_COLORS.ConversationPending },
      { label: "Change request", color: CALL_LOG_COLORS.Review },
      { label: "Solved", color: CALL_LOG_COLORS.Solved },
    ],
  },
  rating: {
    title: "Rating",
    options: [
      { label: "Rated (1+)", color: "#FFC107" },
      { label: "Unrated (0)", color: CALL_LOG_COLORS.ConversationPending },
    ],
  },
};

// Assumed Icon-Color mapping for Order statuses
const ORDER_COLORS = {
  Delivered: "#0f8c3a", // Green
  Shipped: "#4A66FF", // Blue
  Processing: "#F57C00", // Orange
  Cancelled: "#D32F2F", // Red
  Paid: "#1e7a3c", // Dark Green
  Pending: "#555", // Grey
};

export const ORDER_FILTER_DEFINITIONS = {
  status: {
    title: "Order Status",
    options: [
      { label: "Delivered", color: ORDER_COLORS.Delivered },
      { label: "Shipped", color: ORDER_COLORS.Shipped },
      { label: "Processing", color: ORDER_COLORS.Processing },
      { label: "Cancelled", color: ORDER_COLORS.Cancelled },
    ],
  },
  paymentStatus: {
    title: "Payment Status",
    options: [
      { label: "Paid", color: ORDER_COLORS.Paid },
      { label: "Pending", color: ORDER_COLORS.Pending },
      { label: "Refunded", color: ORDER_COLORS.Cancelled },
    ],
  },
  customerSegment: {
    title: "Customer Type",
    options: [
      { label: "Enterprise", color: "#5E35B1" },
      { label: "SME", color: "#00897B" },
      { label: "Individual", color: "#1E88E5" },
    ],
  },
};

// Assumed Icon-Color mapping for Training statuses
const TRAINING_COLORS = {
  Completed: "#0f8c3a", // Green
  Pending: "#4A66FF", // Blue
  Overdue: "#FF9966", // Orange
  General: "#555", // Grey
  ReTraining: "#FF5E62", // Pink
  New: "#56CCF2", // Light Blue
};

export const TRAINING_FILTER_DEFINITIONS = {
  Status: {
    title: "Completion Status",
    options: [
      { label: "Completed", color: TRAINING_COLORS.Completed },
      { label: "Pending", color: TRAINING_COLORS.Pending },
      { label: "In Progress", color: TRAINING_COLORS.Pending },
      { label: "Overdue", color: TRAINING_COLORS.Overdue },
    ],
  },
  TrainingType: {
    title: "Session Type",
    options: [
      { label: "New Training", color: TRAINING_COLORS.New },
      { label: "Re Training", color: TRAINING_COLORS.ReTraining },
      { label: "Workshop", color: TRAINING_COLORS.General },
      { label: "Certification", color: TRAINING_COLORS.General },
    ],
  },
  TrainingMode: {
    title: "Mode",
    options: [
      { label: "Online", color: "#8E2DE2" },
      { label: "OnSite", color: "#38ef7d" },
      { label: "Hybrid", color: "#9E9E9E" },
    ],
  },
};


export function getStatusStyle(status) {
  const s = status?.toLowerCase() || "";

  // CLOSED / SOLVED — serious warm red
  if (s.includes("closed") || s.includes("solved")) {
    return {
      bg: "#FDE2E1", // warm soft red background
      color: "#B42318", // deep serious red
      icon: <CheckCircleOutlineRounded />,
    };
  }

  // CHANGE / REVIEW — warm amber/orange
  if (s.includes("change") || s.includes("review")) {
    return {
      bg: "#FFF4D6", // warm light honey
      color: "#B45F06", // rich amber/brown
      icon: <ChangeCircleRounded />,
    };
  }

  // NEW / OPEN — warm soft teal-blue (modern + friendly)
  if (s.includes("new") || s.includes("open")) {
    return {
      bg: "#DFF4FF", // soft warm sky-blue
      color: "#0B4C71", // deep warm blue
      icon: <FiberNewRounded />,
    };
  }

  // DEFAULT — warm neutral gray
  return {
    bg: "#F5F5F4", // warm light gray
    color: "#44403C", // warm charcoal
    icon: <AssignmentRounded />,
  };
}