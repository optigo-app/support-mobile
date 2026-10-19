import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useCommonStore from "../../../store/CommonStore";
import {
  List,
  ListItemButton,
  Avatar,
  Box,
  Typography,
  Chip,
  CircularProgress,
  AppBar,
  IconButton,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { MdCached } from "react-icons/md";
import { EmailScrollArea } from "../../ui/ScrollArea";
import Loader from "../../ui/Loader";
import TicketApi from "../../../apis/TicketApiController";
import { useAuth } from "../../../contexts/AuthContext";
import { useSocket } from "../../../contexts/SocketContext";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);

const PAGE_SIZE = 20;

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
];

const COLORS = {
  border: "#e0e0e0",
  title: "#1e293b",
  subtitle: "#334155",
  textSecondary: "#64748b",
  bgHover: "rgba(0, 0, 0, 0.03)",
  headerBorder: "rgba(0, 0, 0, 0.08)",
};

const MODULE_STYLES = {
  call: {
    bg: "#eff6ff",
    color: "#2563eb",
    icon: <CallIcon fontSize="small" />,
  },
  tranning: {
    bg: "#fef9ec",
    color: "#d97706",
    icon: <SchoolIcon fontSize="small" />,
  },
  order: {
    bg: "#f0fdf4",
    color: "#16a34a",
    icon: <ShoppingCartIcon fontSize="small" />,
  },
  ticket: {
    bg: "#fdf4ff",
    color: "#9333ea",
    icon: <ConfirmationNumberIcon fontSize="small" />,
  },
  default: {
    bg: "#f1f5f9",
    color: "#475569",
    icon: <NotificationsIcon fontSize="small" />,
  },
};

const getStatusStyles = (title) => {
  const normalized = title?.toLowerCase() || "";
  if (normalized.includes("accepted")) {
    return { bg: "#ecfdf5", color: "#059669" };
  }
  if (normalized.includes("updated") || normalized.includes("solved")) {
    return { bg: "#f0fdf4", color: "#16a34a" };
  }
  return { bg: "#f8fafc", color: "#64748b" };
};

const formatRobustDate = (dateString) => {
  if (!dateString) return { smart: "" };
  try {
    // 1. Strip trailing 'Z' if present because backend SQL Server stores local Indian time
    // but serializes it with 'Z', causing an erroneous +5:30 shift (e.g. 5:21 PM -> 10:51 PM)
    let cleanInput = dateString;
    if (typeof cleanInput === "string") {
      cleanInput = cleanInput.trim().replace(/Z$/i, "");
    }

    const d = dayjs(cleanInput);
    if (!d.isValid()) return { smart: "" };

    const now = dayjs();
    const diffSec = now.diff(d, "second");
    const diffMin = now.diff(d, "minute");
    const diffHour = now.diff(d, "hour");

    let smartText = "";
    if (diffSec >= -60 && diffSec < 60) {
      smartText = "Just now";
    } else if (diffMin >= 1 && diffMin < 60) {
      smartText = `${diffMin}m ago`;
    } else if (d.isToday()) {
      smartText = diffHour < 12 ? `${diffHour}h ago` : `Today, ${d.format("h:mm A")}`;
    } else if (d.isYesterday()) {
      smartText = `Yesterday, ${d.format("h:mm A")}`;
    } else if (d.isSame(now, "year")) {
      smartText = d.format("MMM D, h:mm A");
    } else {
      smartText = d.format("MMM D YYYY, h:mm A");
    }

    return {
      smart: smartText,
      full: d.format("MMM D YYYY, h:mm A"),
      time: d.format("h:mm A"),
    };
  } catch (e) {
    return { smart: "" };
  }
};

function extractResourceId(item) {
  const module = item?.Module?.toLowerCase() || "";
  if (item?.RefId) return item.RefId;
  if (item?.RefNo) return item.RefNo;
  if (item?.TicketNo) return item.TicketNo;
  if (item?.TicketId) return item.TicketId;
  if (item?.TicketID) return item.TicketID;
  if (item?.CallLogid) return item.CallLogid;
  if (item?.CallLogId) return item.CallLogId;
  if (item?.CallId) return item.CallId;
  if (item?.CallID) return item.CallID;
  if (item?.OrderNo) return item.OrderNo;
  if (item?.OrderId) return item.OrderId;
  if (item?.OrderID) return item.OrderID;
  if (item?.SessionID) return item.SessionID;
  if (item?.SessionId) return item.SessionId;
  if (item?.SrNo) return item.SrNo;
  if (item?.Srno) return item.Srno;

  const text = `${item?.Title || ""} ${item?.Message || ""}`;
  let match = null;
  if (module === "call") {
    match =
      text.match(/Call\s*(?:ID|Log)?\s*(?:#|No\.?)?\s*(\d+)/i) ||
      text.match(/id\s*(\d+)/i) ||
      text.match(/\b\d+\b/);
  } else if (module === "ticket") {
    match =
      text.match(/Ticket\s*(?:ID|No\.?)?\s*(\d+)/i) ||
      text.match(/id\s*(\d+)/i) ||
      text.match(/\b\d+\b/);
  } else if (module === "order") {
    match =
      text.match(/Order\s*(?:No\.?|ID)?\s*(?:#)?\s*(\d+)/i) ||
      text.match(/id\s*(\d+)/i) ||
      text.match(/\b\d+\b/);
  } else if (module === "tranning" || module === "training") {
    match =
      text.match(/(?:Session|Training)\s*(?:ID|No\.?)?\s*(?:#)?\s*(\d+)/i) ||
      text.match(/id\s*(\d+)/i) ||
      text.match(/\b\d+\b/);
  }
  return match ? match[1] : null;
}

function SwipeableNotificationItem({ item, tick, onClick, onDelete }) {
  const [offsetX, setOffsetX] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalRef = useRef(null);
  const holdTimerRef = useRef(null);
  const initialOffsetRef = useRef(0);

  const typeStyle =
    MODULE_STYLES[item?.Module?.toLowerCase()] || MODULE_STYLES.default;
  const formatted = formatRobustDate(item?.EntryDate);
  const statusStyle = getStatusStyles(item?.Title);
  const isUnread = item?.IsRead !== 1;

  // Hold (Long-press) detection: hold for 400ms without dragging to slide open delete like Apple
  const handleTouchStart = (e) => {
    if (isDeleting) return;
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    initialOffsetRef.current = offsetX;
    isHorizontalRef.current = null;
    setIsDragging(false);

    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      if (typeof window !== "undefined" && window.navigator?.vibrate) {
        try {
          window.navigator.vibrate(15);
        } catch (_) { }
      }
      setOffsetX(-80);
    }, 400);
  };

  const handleTouchMove = (e) => {
    if (isDeleting) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - startXRef.current;
    const diffY = touch.clientY - startYRef.current;

    if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
      clearTimeout(holdTimerRef.current);
    }

    if (isHorizontalRef.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalRef.current) {
      setIsDragging(true);
      let targetX = initialOffsetRef.current + diffX;
      if (targetX > 0) {
        targetX = targetX * 0.2;
      } else if (targetX < -110) {
        targetX = -110 + (targetX + 110) * 0.2;
      }
      setOffsetX(targetX);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(holdTimerRef.current);
    if (!isDragging) return;
    setIsDragging(false);

    if (offsetX < -140) {
      triggerDelete();
      return;
    }

    if (offsetX < -35) {
      setOffsetX(-80);
    } else {
      setOffsetX(0);
    }
  };

  // Mouse drag support for desktop
  const handleMouseDown = (e) => {
    if (isDeleting || e.button !== 0) return;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    initialOffsetRef.current = offsetX;
    isHorizontalRef.current = null;
    setIsDragging(false);

    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      setOffsetX(-80);
    }, 400);

    const onMouseMove = (moveEvent) => {
      const diffX = moveEvent.clientX - startXRef.current;
      const diffY = moveEvent.clientY - startYRef.current;
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        clearTimeout(holdTimerRef.current);
      }
      if (isHorizontalRef.current === null) {
        if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
          isHorizontalRef.current = Math.abs(diffX) > Math.abs(diffY);
        }
      }
      if (isHorizontalRef.current) {
        setIsDragging(true);
        let targetX = initialOffsetRef.current + diffX;
        if (targetX > 0) targetX = targetX * 0.2;
        else if (targetX < -110) targetX = -110 + (targetX + 110) * 0.2;
        setOffsetX(targetX);
      }
    };

    const onMouseUp = () => {
      clearTimeout(holdTimerRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      setIsDragging(false);
      setOffsetX((prev) => {
        if (prev < -140) {
          triggerDelete();
          return prev;
        }
        return prev < -35 ? -80 : 0;
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const triggerDelete = () => {
    setIsDeleting(true);
    setOffsetX(-window.innerWidth);
    setTimeout(() => {
      onDelete(item);
    }, 280);
  };

  const handleClickItem = (e) => {
    if (offsetX !== 0) {
      e.stopPropagation();
      setOffsetX(0);
      return;
    }
    onClick(item);
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        bgcolor: "#fff",
        maxHeight: isDeleting ? 0 : 160,
        opacity: isDeleting ? 0 : 1,
        transition: isDeleting
          ? "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)"
          : "max-height 0.28s ease, opacity 0.28s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* APPLE STYLE RED DELETE BUTTON BEHIND */}
      <Box
        onClick={(e) => {
          e.stopPropagation();
          triggerDelete();
        }}
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 80,
          bgcolor: "#ff3b30",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.4,
          cursor: "pointer",
          zIndex: 1,
          userSelect: "none",
          transition: "background-color 0.2s",
          "&:active": {
            bgcolor: "#dc2626",
          },
        }}
      >
        <DeleteRoundedIcon sx={{ color: "#fff", fontSize: 24 }} />
        <Typography
          sx={{
            color: "#fff",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Delete
        </Typography>
      </Box>

      {/* FOREGROUND CARD */}
      <ListItemButton
        onClick={handleClickItem}
        sx={{
          position: "relative",
          zIndex: 2,
          py: 1.5,
          px: 2,
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          borderBottom: `1px solid ${COLORS.border}`,
          bgcolor: isUnread ? "#f0f6ff" : "#fff",
          transform: `translateX(${offsetX}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.28s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s",
          "&:hover": {
            bgcolor: isUnread ? "#e6f0ff" : COLORS.bgHover,
          },
        }}
      >
        <Box sx={{ position: "relative", mt: 0.2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: typeStyle.bg,
              color: typeStyle.color,
            }}
          >
            {typeStyle.icon}
          </Avatar>
          {isUnread && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 9,
                height: 9,
                bgcolor: "#2563eb",
                borderRadius: "50%",
                border: "1.5px solid #fff",
              }}
            />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              mb: 0.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: isUnread ? 700 : 500,
                fontSize: "0.9rem",
                color: isUnread ? COLORS.title : COLORS.textSecondary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                mr: 1,
              }}
            >
              {item?.Title || "Notification"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.textSecondary,
                whiteSpace: "nowrap",
                fontSize: "0.72rem",
              }}
            >
              {formatted?.smart}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "0.82rem",
              color: COLORS.subtitle,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 1,
              lineHeight: 1.4,
            }}
          >
            {item?.Message || "No details provided."}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.8,
              alignItems: "center",
            }}
          >
            {item?.Module && (
              <Chip
                label={item.Module.toUpperCase()}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  bgcolor: typeStyle.bg,
                  color: typeStyle.color,
                  borderRadius: "4px",
                }}
              />
            )}
            <Chip
              label={item?.Title || "Info"}
              size="small"
              sx={{
                height: 18,
                fontSize: "0.65rem",
                fontWeight: 600,
                bgcolor: statusStyle.bg,
                color: statusStyle.color,
                borderRadius: "4px",
              }}
            />
          </Box>
        </Box>
      </ListItemButton>
    </Box>
  );
}

export default function NotificationPage() {
  const { user } = useAuth();
  const socket = useSocket();
  const { setTabId } = useCommonStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" | "unread" | "read"
  const [counts, setCounts] = useState({
    total: 0,
    read: 0,
    unread: 0,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFetchingRef = useRef(false);
  const scrollRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Live timer tick to update real-time relative timestamps (e.g. "Just now", "2m ago") dynamically
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const fetchNotifications = useCallback(
    async (pageNum, replace = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsFetching(true);
      try {
        const res = await TicketApi.getNotificationList({
          Projectcode: user?.companycode,
          page: pageNum,
          pagesize: PAGE_SIZE,
        });
        const items = res?.rd ?? res?.Data?.rd ?? [];
        const countsData = (res?.rd1 ?? res?.Data?.rd1 ?? [])[0];

        if (countsData) {
          setCounts({
            total: Number(countsData.TotalCount ?? 0),
            read: Number(countsData.ReadCount ?? 0),
            unread: Number(countsData.UnreadCount ?? 0),
          });
        }

        if (!isMounted.current) return;
        setNotifications((prev) => {
          const next = replace ? items : [...prev, ...items];
          const totalExpected = countsData
            ? Number(countsData.TotalCount ?? 0)
            : 0;
          if (totalExpected > 0) {
            setHasMore(next.length < totalExpected);
          } else {
            setHasMore(items.length >= PAGE_SIZE);
          }
          return next;
        });

        if (replace) {
          setPage(1);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        isFetchingRef.current = false;
        if (isMounted.current) setIsFetching(false);
      }
    },
    [user?.companycode]
  );

  useEffect(() => {
    fetchNotifications(1, true);
  }, [fetchNotifications]);

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage, false);
  }, [hasMore, page, fetchNotifications]);

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((n) => n?.IsRead !== 1);
    }
    if (filter === "read") {
      return notifications.filter((n) => n?.IsRead === 1);
    }
    return notifications;
  }, [notifications, filter]);

  // Synchronize infinite loader with active filter:
  // If the filtered list is small and doesn't fill the screen, auto-fetch the next page if more items exist
  useEffect(() => {
    if (!isMounted.current) return;
    if (
      filter !== "all" &&
      hasMore &&
      !isFetching &&
      filteredNotifications.length < 8 &&
      notifications.length > 0
    ) {
      loadMore();
    }
  }, [
    filter,
    hasMore,
    isFetching,
    filteredNotifications.length,
    notifications.length,
    loadMore,
  ]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollHeight - el.scrollTop <= el.clientHeight + 200) {
        loadMore();
      }
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  const handleNotificationClick = useCallback(
    async (item) => {
      const module = item?.Module?.toLowerCase() || "";
      const id = extractResourceId(item);

      let targetTab = null;
      let paramKey = null;

      if (module === "call") {
        targetTab = 1;
        paramKey = "callId";
      } else if (module === "ticket") {
        targetTab = 2;
        paramKey = "ticketId";
      } else if (module === "order") {
        targetTab = 3;
        paramKey = "orderId";
      } else if (module === "tranning" || module === "training") {
        targetTab = 4;
        paramKey = "trainingId";
      }

      if (targetTab !== null) {
        setTabId(targetTab);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("tab", targetTab.toString());
        if (id) {
          newParams.set(paramKey, id.toString());
        }
        setSearchParams(newParams);
      }

      if (item.IsRead === 1) return;
      setNotifications((prev) =>
        prev.map((n) => (n.Id === item.Id ? { ...n, IsRead: 1 } : n))
      );
      setCounts((prev) => ({
        ...prev,
        read: prev.read + 1,
        unread: Math.max(0, prev.unread - 1),
      }));
      try {
        await TicketApi.markNotificationRead({
          NotificationId: item.Id,
          CorpId: user?.id,
        });
      } catch (err) {
        console.error("Error marking notification as read:", err);
        setNotifications((prev) =>
          prev.map((n) => (n.Id === item.Id ? { ...n, IsRead: 0 } : n))
        );
        setCounts((prev) => ({
          ...prev,
          read: Math.max(0, prev.read - 1),
          unread: prev.unread + 1,
        }));
      }
    },
    [user?.id, searchParams, setSearchParams, setTabId]
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setPage(1);
    setHasMore(true);
    try {
      const res = await TicketApi.getNotificationList({
        Projectcode: user?.companycode,
        page: 1,
        pagesize: PAGE_SIZE,
      });
      const items = res?.rd ?? res?.Data?.rd ?? [];
      const countsData = (res?.rd1 ?? res?.Data?.rd1 ?? [])[0];

      if (countsData) {
        setCounts({
          total: Number(countsData.TotalCount ?? 0),
          read: Number(countsData.ReadCount ?? 0),
          unread: Number(countsData.UnreadCount ?? 0),
        });
      }

      if (!isMounted.current) return;
      setNotifications(items);
      const totalExpected = countsData
        ? Number(countsData.TotalCount ?? 0)
        : 0;
      if (totalExpected > 0) {
        setHasMore(items.length < totalExpected);
      } else {
        setHasMore(items.length >= PAGE_SIZE);
      }
    } catch (err) {
      console.error("Error refreshing notifications:", err);
    } finally {
      if (isMounted.current) setIsRefreshing(false);
    }
  }, [user?.companycode]);

  // Listen to ALL socket events: when ANY event is received (tickets, calls, comments, orders, notifications),
  // immediately refresh notifications to fetch latest data and update counts
  useEffect(() => {
    if (!socket) return;

    let debounceTimer = null;
    const handleIncomingSocketEvent = (eventName) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleRefresh();
      }, 300);
    };

    // 1. Socket.io catch-all: fires on ANY incoming event from server
    if (typeof socket.onAny === "function") {
      socket.onAny(handleIncomingSocketEvent);
    }

    // 2. Specific events fallback in case onAny is unavailable
    const COMMON_EVENTS = [
      "notification",
      "Notification",
      "new_notification",
      "NewNotification",
      "CreateTicket",
      "UpdateTicket",
      "TicketComment",
      "CloseTicket",
      "AddRating",
      "AddCall",
      "ADDCOMMENTS",
      "AddComments",
      "AddComment",
      "AcceptCall",
      "StartCall",
      "CALLSTART",
      "ForwardedCall",
      "EndCall",
      "CALLEND",
      "ES",
      "Estatus",
    ];

    if (typeof socket.onAny !== "function") {
      COMMON_EVENTS.forEach((evt) => {
        socket.on(evt, handleIncomingSocketEvent);
      });
    }

    return () => {
      clearTimeout(debounceTimer);
      if (typeof socket.offAny === "function") {
        socket.offAny(handleIncomingSocketEvent);
      }
      if (typeof socket.onAny !== "function") {
        COMMON_EVENTS.forEach((evt) => {
          socket.off(evt, handleIncomingSocketEvent);
        });
      }
    };
  }, [socket, handleRefresh]);

  const handleDeleteNotification = useCallback(
    async (item) => {
      // Remove item from the local list immediately for instant, smooth animation
      setNotifications((prev) => prev.filter((n) => n.Id !== item.Id));

      try {
        await TicketApi.deleteNotification({
          NotificationId: item.Id,
          CorpId: user?.id,
        });
        // Fetch the fresh list and accurate server counts from rd1
        await handleRefresh();
      } catch (err) {
        console.error("Error deleting notification:", err);
        await handleRefresh();
      }
    },
    [user?.id, handleRefresh]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "#fff",
        height: "100%",
      }}
    >
      {/* HEADER */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: `1px solid ${COLORS.headerBorder}`,
          color: COLORS.title,
          top: 0,
          zIndex: 1100,
          borderRadius: 0,
          boxShadow: "none !important",
          "&::before": { display: "none !important" },
          "&::after": { display: "none !important" },
        }}
      >
        <Box
          sx={{
            px: 2,
            pt: 1.6,
            pb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: COLORS.title,
              letterSpacing: "-0.01em",
            }}
          >
            Notifications
          </Typography>
          <IconButton
            onClick={handleRefresh}
            disabled={isRefreshing}
            size="small"
            sx={{
              color: COLORS.textSecondary,
              transition: "transform 0.3s ease",
              ...(isRefreshing && {
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }),
            }}
          >
            <MdCached size={22} />
          </IconButton>
        </Box>

        {/* FILTER CHIPS (All, Unread, Read) */}
        <Box
          sx={{
            px: 2,
            pb: 1.5,
            pt: 0.2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = filter === tab.value;
            const count =
              tab.value === "all"
                ? counts.total
                : tab.value === "unread"
                  ? counts.unread
                  : counts.read;

            return (
              <Chip
                key={tab.value}
                label={`${tab.label} (${count})`}
                clickable
                onClick={() => setFilter(tab.value)}
                size="small"
                sx={{
                  fontWeight: isSelected ? 600 : 500,
                  fontSize: "0.82rem",
                  height: 32,
                  textTransform: "capitalize",
                  borderRadius: "16px",
                  px: 0.8,
                  bgcolor: isSelected ? "#e8f0fe" : "#fff",
                  color: isSelected ? "#1967d2" : "#3c4043",
                  border: isSelected ? "1px solid #d2e3fc" : "1px solid #dadce0",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: isSelected ? "#d2e3fc" : "#f1f3f4",
                  },
                }}
              />
            );
          })}
        </Box>
      </AppBar>

      {/* SCROLL AREA */}
      <EmailScrollArea ref={scrollRef}>
        {isFetching && notifications.length === 0 ? (
          <Loader />
        ) : filteredNotifications.length === 0 && !isFetching ? (
          <Box sx={{ p: 5, textAlign: "center", color: COLORS.textSecondary }}>
            <Typography variant="body2">
              {filter === "unread"
                ? "No unread notifications"
                : filter === "read"
                  ? "No read notifications"
                  : "No notifications found"}
            </Typography>
            {hasMore && (
              <Typography
                variant="caption"
                onClick={loadMore}
                sx={{
                  color: "#2563eb",
                  cursor: "pointer",
                  mt: 1.5,
                  display: "inline-block",
                  fontWeight: 600,
                }}
              >
                Load more notifications
              </Typography>
            )}
          </Box>
        ) : (
          <List disablePadding sx={{ bgcolor: "#fff", width: "100%" }}>
            {filteredNotifications.map((item) => (
              <SwipeableNotificationItem
                key={item.Id}
                item={item}
                tick={tick}
                onClick={handleNotificationClick}
                onDelete={handleDeleteNotification}
              />
            ))}

            {isFetching && notifications.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress size={24} sx={{ color: "#007AFF" }} />
              </Box>
            )}

            {!hasMore && notifications.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  textAlign: "center",
                  color: COLORS.textSecondary,
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                  All notifications loaded (
                  {counts.total || filteredNotifications.length})
                </Typography>
              </Box>
            )}
          </List>
        )}
      </EmailScrollArea>
    </Box>
  );
}