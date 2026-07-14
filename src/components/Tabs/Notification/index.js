import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { MdCached } from "react-icons/md";
import { EmailScrollArea } from "../../ui/ScrollArea";
import Loader from "../../ui/Loader";
import TicketApi from "../../../apis/TicketApiController";
import { useAuth } from "../../../contexts/AuthContext";

const PAGE_SIZE = 20;


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
    const date = new Date(dateString);
    return {
      smart: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
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

  // Try to parse from Title or Message
  const text = `${item?.Title || ""} ${item?.Message || ""}`;
  let match = null;
  if (module === "call") {
    match = text.match(/Call\s*(?:ID|Log)?\s*(?:#|No\.?)?\s*(\d+)/i) || text.match(/id\s*(\d+)/i) || text.match(/\b\d+\b/);
  } else if (module === "ticket") {
    match = text.match(/Ticket\s*(?:ID|No\.?)?\s*(\d+)/i) || text.match(/id\s*(\d+)/i) || text.match(/\b\d+\b/);
  } else if (module === "order") {
    match = text.match(/Order\s*(?:No\.?|ID)?\s*(?:#)?\s*(\d+)/i) || text.match(/id\s*(\d+)/i) || text.match(/\b\d+\b/);
  } else if (module === "tranning" || module === "training") {
    match = text.match(/(?:Session|Training)\s*(?:ID|No\.?)?\s*(?:#)?\s*(\d+)/i) || text.match(/id\s*(\d+)/i) || text.match(/\b\d+\b/);
  }
  return match ? match[1] : null;
}

export default function NotificationPage() {
  const { user } = useAuth();
  const { setTabId } = useCommonStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchNotifications = useCallback(async (pageNum, replace = false) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await TicketApi.getNotificationList({
        Projectcode: user?.companycode,
        page: pageNum,
        pagesize: PAGE_SIZE,
      });
      const items = res?.rd ?? res?.Data?.rd ?? [];
      if (!isMounted.current) return;
      if (replace) {
        setNotifications(items);
        setPage(1);
      } else {
        setNotifications((prev) => [...prev, ...items]);
      }
      setHasMore(items.length >= PAGE_SIZE);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      if (isMounted.current) setIsFetching(false);
    }
  }, [user?.companycode, isFetching]);

  useEffect(() => {
    fetchNotifications(1, true);
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || isFetching) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage, false);
  }, [hasMore, isFetching, page, fetchNotifications]);

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

  const handleNotificationClick = useCallback(async (item) => {
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
    }
  }, [user?.id, searchParams, setSearchParams, setTabId]);

  const handleRefresh = async () => {
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
      if (!isMounted.current) return;
      setNotifications(items);
      setHasMore(items.length >= PAGE_SIZE);
    } catch (err) {
      console.error("Error refreshing notifications:", err);
    } finally {
      if (isMounted.current) setIsRefreshing(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", bgcolor: "#fff", height: "100%" }}>
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
            py: 1.6,
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
      </AppBar>

      {/* SCROLL AREA */}
      <EmailScrollArea ref={scrollRef}>
        {isFetching && notifications.length === 0 ? (
          <Loader />
        ) : notifications.length === 0 && !isFetching ? (
          <Box sx={{ p: 5, textAlign: "center", color: COLORS.textSecondary }}>
            <Typography variant="body2">No notifications found</Typography>
          </Box>
        ) : (
          <List disablePadding sx={{ bgcolor: "#fff", width: "100%" }}>
            {notifications.map((item) => {
              const typeStyle = MODULE_STYLES[item?.Module?.toLowerCase()] || MODULE_STYLES.default;
              const formatted = formatRobustDate(item?.EntryDate);
              const statusStyle = getStatusStyles(item?.Title);
              const isUnread = item?.IsRead !== 1;

              return (
                <ListItemButton
                  key={item.Id}
                  onClick={() => handleNotificationClick(item)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    borderBottom: `1px solid ${COLORS.border}`,
                    transition: "background-color 0.2s",
                    bgcolor: isUnread ? "#f0f6ff" : "#fff",
                    "&:hover": { bgcolor: isUnread ? "#e6f0ff" : COLORS.bgHover },
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
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
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
                        sx={{ color: COLORS.textSecondary, whiteSpace: "nowrap", fontSize: "0.72rem" }}
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

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, alignItems: "center" }}>
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
              );
            })}

            {isFetching && notifications.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress size={24} sx={{ color: "#007AFF" }} />
              </Box>
            )}

            {!hasMore && notifications.length > 0 && (
              <Box sx={{ p: 2, textAlign: "center", color: COLORS.textSecondary }}>
                <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                  All notifications loaded ({notifications.length})
                </Typography>
              </Box>
            )}
          </List>
        )}
      </EmailScrollArea>
    </Box>
  );
}