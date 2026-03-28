import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import advancedFormat from "dayjs/plugin/advancedFormat";

// 1. Extend dayjs with necessary plugins
dayjs.extend(relativeTime); // For "2 hours ago"
dayjs.extend(calendar);     // For "Today at 2:30 PM"
dayjs.extend(isToday);      // Boolean checks
dayjs.extend(isYesterday);  // Boolean checks
dayjs.extend(advancedFormat); // For Ordinals (1st, 2nd)

/**
 * Robust Date Formatter
 * @param {string | Date} dateString - The date string (e.g., "2025-12-03 17:16:11")
 * @returns {object} An object containing various format strings
 */
export const formatRobustDate = (dateString) => {
  // Handle null, undefined, or empty strings
  if (!dateString) {
    return {
      raw: null,
      isValid: false,
      relative: "-",
      calendar: "-",
      time: "-",
      date: "-",
      shortDate: "-",
      full: "-",
      smart: "-",
      api: null,
    };
  }

  // 1. Robust Parsing
  let date = dayjs(dateString);
  
  // If invalid and string, try to fix common issue where local time has Z
  if (!date.isValid() && typeof dateString === "string") {
    date = dayjs(dateString.replace(/Z$/, ""));
  }
  
  // Try parsing as number if it looks like one
  if (!date.isValid() && !isNaN(Number(dateString))) {
    date = dayjs(Number(dateString));
  }

  if (!date.isValid()) {
    return {
      raw: null,
      isValid: false,
      relative: "Invalid Date",
      calendar: "Invalid Date",
      time: "-",
      date: "-",
      shortDate: "-",
      full: "-",
      smart: "-",
      api: null,
    };
  }


  // 2. Define Formats
  return {
    // Basic Data
    raw: date,
    isValid: true,
    
    // Time: "5:16 PM"
    time: date.format("h:mm A"), 

    // Date: "03 Dec 2025"
    date: date.format("DD MMM YYYY"),
    
    // Short Date: "03/12/25"
    shortDate: date.format("DD/MM/YY"),

    // Full: "03 Dec 2025, 5:16 PM"
    full: date.format("DD MMM YYYY, h:mm A"),

    // Relative: "a few seconds ago", "2 hours ago", "in 5 minutes"
    relative: date.fromNow(),

    // Calendar: "Today at 5:16 PM", "Yesterday at 5:16 PM", "Last Thursday..."
    calendar: date.calendar(null, {
      sameDay: '[Today at] h:mm A', // Today at 5:16 PM
      nextDay: '[Tomorrow at] h:mm A',
      nextWeek: 'dddd [at] h:mm A',
      lastDay: '[Yesterday at] h:mm A', // Yesterday at 5:16 PM
      lastWeek: '[Last] dddd [at] h:mm A', 
      sameElse: 'DD/MM/YYYY' // Everything else
    }),

    /**
     * Smart Label (Great for Lists/Call Logs)
     * Logic updated to "just day" as per user request:
     * - If Today -> Show "Today"
     * - If Yesterday -> Show "Yesterday"
     * - If This Year -> Show Date ("3 Dec")
     * - If Older -> Show Full Date ("3 Dec 2024")
     */
    smart: (() => {
      if (date.isToday()) return "Today";
      if (date.isYesterday()) return "Yesterday";
      if (date.isSame(dayjs(), 'year')) return date.format("D MMM"); // 3 Dec
      return date.format("D MMM YYYY"); // 3 Dec 2024
    })(),
    
    // Database format (for sending back to API)
    api: date.format("YYYY-MM-DD HH:mm:ss")
  };
};


/**
 * UTILITIES / CONSTANTS
 */
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper to add leading zero (e.g., 5 -> "05")
const padZero = (num) => num.toString().padStart(2, "0");

/**
 * Helper to ensure we have a valid Date object
 */
const parseDate = (time) => {
  if (!time) return null;

  // 👇 if API sends local time incorrectly with Z (UTC marker) remove it
  if (typeof time === "string" && time.endsWith("Z")) {
    time = time.replace(/Z$/, ""); 
  }
  
  let date;
  if (time instanceof Date) {
    date = time;
  } else if (typeof time === "string") {
    date = isNaN(Number(time)) ? new Date(time) : new Date(parseInt(time));
  } else if (typeof time === "number") {
    date = new Date(time);
  }

  if (!date || isNaN(date.getTime())) return null;
  return date;
};


/**
 * FormatTime - Custom Native Implementation
 * 
 * @param {string | number | Date} time - time value to format
 * @param {"relative" | "shortDate" | "fullDate" | "datetime"} type - format style
 */
export const FormatTime = (time, type = "shortDate") => {
  const date = parseDate(time);
  if (!date) return "";

  const optsBase = { timeZone: "Asia/Kolkata" };

  switch (type) {
    case "relative":
      return getRelativeTime(date);

    case "shortDate":
      return new Intl.DateTimeFormat("en-IN", {
        ...optsBase,
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);

    case "fullDate":
      return new Intl.DateTimeFormat("en-IN", {
        ...optsBase,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);

    case "datetime":
      return new Intl.DateTimeFormat("en-IN", {
        ...optsBase,
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);

    default:
      return new Intl.DateTimeFormat("en-IN", {
        ...optsBase,
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
  }
};


/**
 * Calculates "X minutes ago", "Yesterday", etc.
 */
const getRelativeTime = (date) => {
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return "Just now";
  }
  if (secondsPast < 3600) {
    const m = Math.floor(secondsPast / 60);
    return `${m} minute${m > 1 ? "s" : ""} ago`;
  }
  if (secondsPast < 86400) {
    const h = Math.floor(secondsPast / 3600);
    return `${h} hour${h > 1 ? "s" : ""} ago`;
  }
  if (secondsPast < 172800) { // 48 hours
    return "Yesterday";
  }
  
  // Fallback to short date if older than 2 days
  return FormatTime(date, "shortDate");
};

/**
 * formatToISTAmPm
 * Converts "15:30" (24h string) -> "03:30 PM"
 * 
 * Note: If input is just a string like "15:30", we don't need Timezone logic 
 * because "15:30" is "3:30 PM" in every country. 
 */
export function formatToISTAmPm(timeString) {
  try {
    if (!timeString || typeof timeString !== "string") return "";

    const [h, m] = timeString.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return "";

    // Build a date for today with provided time
    const d = new Date();
    d.setHours(h, m, 0, 0);

    // Convert using Intl
    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(d);
  } catch {
    return "";
  }
}


export const formatDate4 = (date) => {
  try {
    const entryDate = new Date(date);
    if (isNaN(entryDate)) return "Invalid Date";

    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }).format(entryDate);
  } catch {
    return "N/A";
  }
};



const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

const todayDate = `${yyyy}-${mm}-${dd}`;

const yesterdayDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
})();

const thisMonthStart = `${yyyy}-${mm}-01`;
const thisMonthEnd = (() => {
  const d = new Date(yyyy, today.getMonth() + 1, 0);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
})();

const thisWeekStart = dayjs().startOf('week').format('YYYY-MM-DD');
const thisWeekEnd = dayjs().endOf('week').format('YYYY-MM-DD');

export const getGreeting = () => {
  const hour = dayjs().hour();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
};

export {
  todayDate,
  yesterdayDate,
  thisMonthStart,
  thisMonthEnd,
  thisWeekStart,
  thisWeekEnd,
}