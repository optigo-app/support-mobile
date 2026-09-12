import React from "react";
import { Box, Typography, Paper, Stack, Button, Rating } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const isCallLogClosed = (logData) => {
  if (!logData) return false;
  const status = String(
    logData?.Estatus ||
    logData?.estatus ||
    logData?.status ||
    ""
  ).toLowerCase().trim();

  // ONLY lock when external status is explicitly completed, solved, or closed
  return (
    status === "completed" ||
    status === "solved" ||
    status === "closed"
  );
};

export const isCallLogAccepted = (logData) => {
  if (!logData) return false;
  const receivedByVal = String(logData?.receivedBy || "").trim();
  const assignedEmpVal = String(logData?.AssignedEmpName || "").trim();
  return Boolean(
    (receivedByVal && receivedByVal.toLowerCase() !== "unassigned" && receivedByVal !== "0" && receivedByVal !== "-") ||
    (assignedEmpVal && assignedEmpVal.toLowerCase() !== "unassigned" && assignedEmpVal !== "0" && assignedEmpVal !== "-")
  );
};

export const hasCallLogStartedAndEnded = (logData) => {
  if (!logData) return false;
  const isClosed = isCallLogClosed(logData);
  const isAccepted = isCallLogAccepted(logData);

  const rawDuration = logData?.CallDuration || logData?.duration || "";
  const hasValidDuration = Boolean(
    rawDuration &&
    rawDuration !== "00:00:00" &&
    rawDuration !== "0:00" &&
    rawDuration !== "00:00"
  );
  const hasClosedTimestamp = Boolean(
    logData?.callClosed &&
    typeof logData?.callClosed === "string" &&
    !logData?.callClosed.startsWith("1900")
  );
  const hasFollowUps = Boolean(
    (Array.isArray(logData?.FollowUpList) && logData?.FollowUpList.length > 0) ||
    (typeof logData?.FollowUpList === "string" && logData?.FollowUpList.trim().startsWith("[") && logData?.FollowUpList.trim() !== "[]")
  );

  return Boolean(
    isClosed ||
    hasValidDuration ||
    hasClosedTimestamp ||
    hasFollowUps ||
    (logData?.callStart && !logData?.callStart.startsWith("1900") && isAccepted && !rawDuration.includes("00:00:00"))
  );
};

export const isCallRunning = (logData) => {
  if (!logData) return false;
  if (isCallLogClosed(logData)) return false;

  const extStatus = String(
    logData?.Estatus ||
    logData?.estatus ||
    logData?.status ||
    ""
  ).toLowerCase();

  const isStatusRunning =
    extStatus === "running" ||
    extStatus === "in progress" ||
    extStatus === "in_progress";

  const hasCallStart = Boolean(
    logData?.callStart &&
    typeof logData?.callStart === "string" &&
    !logData?.callStart.startsWith("1900")
  );

  const hasCallClosed = Boolean(
    logData?.callClosed &&
    typeof logData?.callClosed === "string" &&
    !logData?.callClosed.startsWith("1900")
  );

  const rawDuration = String(logData?.CallDuration || logData?.duration || "").trim();
  const hasValidDuration = Boolean(
    rawDuration &&
    rawDuration !== "00:00:00" &&
    rawDuration !== "0:00" &&
    rawDuration !== "00:00" &&
    rawDuration !== "0"
  );

  const receivedByVal = String(logData?.receivedBy || "").trim();
  const assignedEmpVal = String(logData?.AssignedEmpName || "").trim();
  const isAccepted = Boolean(
    (receivedByVal && receivedByVal.toLowerCase() !== "unassigned" && receivedByVal !== "0" && receivedByVal !== "-") ||
    (assignedEmpVal && assignedEmpVal.toLowerCase() !== "unassigned" && assignedEmpVal !== "0" && assignedEmpVal !== "-")
  );

  return (
    (isStatusRunning && !hasCallClosed && !hasValidDuration) ||
    (hasCallStart && !hasCallClosed && !hasValidDuration && isAccepted)
  );
};

export const formatDurationFromStart = (startTime) => {
  if (!startTime) return "00:00:00";
  try {
    const cleanStr = typeof startTime === "string" ? startTime.replace(/-/g, "/") : startTime;
    const startMs = new Date(cleanStr).getTime();
    if (isNaN(startMs)) return "00:00:00";
    const now = Date.now();
    const totalSecs = Math.max(0, Math.floor((now - startMs) / 1000));
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  } catch (e) {
    return "00:00:00";
  }
};

export const ActiveCallLiveBanner = ({ logData }) => {
  const [durationStr, setDurationStr] = React.useState("00:00:00");
  const agentName = (logData?.receivedBy || logData?.AssignedEmpName || "Support Desk").trim();

  React.useEffect(() => {
    if (!logData?.callStart) {
      setDurationStr("00:00:00");
      return;
    }

    const update = () => {
      setDurationStr(formatDurationFromStart(logData.callStart));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [logData?.callStart]);

  if (!isCallRunning(logData)) return null;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2 },
        py: 1,
        bgcolor: "transparent",
      }}
    >
      {/* Apple Dynamic Island / Live Activity in-call capsule */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          height: 40,
          px: 1.5,
          borderRadius: "9999px",
          bgcolor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Left: Pulsing Green Beacon + Status info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: "50%",
              bgcolor: "rgba(52, 199, 89, 0.15)",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "1.5px solid rgba(52, 199, 89, 0.45)",
                animation: "applePulse 2s cubic-bezier(0.2, 0, 0, 1) infinite",
                "@keyframes applePulse": {
                  "0%": { transform: "scale(0.9)", opacity: 1 },
                  "70%": { transform: "scale(1.5)", opacity: 0 },
                  "100%": { transform: "scale(1.5)", opacity: 0 },
                },
              }}
            />
            <PhoneInTalkRoundedIcon sx={{ fontSize: 13, color: "#34C759" }} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.6, minWidth: 0, overflow: "hidden" }}>
            <Typography
              noWrap
              sx={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#1C1C1E",
                letterSpacing: "-0.015em",
                lineHeight: 1,
              }}
            >
              {agentName}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: "0.75rem",
                color: "#8E8E93",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              • Call #{logData?.sr}
            </Typography>
          </Box>
        </Box>

        {/* Right: Soundwave bars + Live timer capsule */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "2px", height: 12 }}>
            {[0.4, 0.9, 0.6].map((scale, i) => (
              <Box
                key={i}
                sx={{
                  width: 2.2,
                  height: 10,
                  bgcolor: "#34C759",
                  borderRadius: "1px",
                  animation: `appleAudio 0.85s ease-in-out ${i * 0.18}s infinite alternate`,
                  "@keyframes appleAudio": {
                    "0%": { transform: "scaleY(0.25)" },
                    "100%": { transform: "scaleY(1)" },
                  },
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: "9999px",
              bgcolor: "rgba(52, 199, 89, 0.12)",
              color: "#1B873F",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Mono', monospace",
              fontVariantNumeric: "tabular-nums",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1.3,
            }}
          >
            {durationStr}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getCallLogCommentState = (logData) => {
  if (!logData) return { canComment: false, state: "queue" };
  const isClosed = isCallLogClosed(logData);
  if (isClosed) {
    return { canComment: false, state: "closed" };
  }
  const isAccepted = isCallLogAccepted(logData);
  if (!isAccepted) {
    return { canComment: false, state: "queue" };
  }
  const isRunning = isCallRunning(logData);
  if (isRunning) {
    return { canComment: false, state: "running" };
  }
  const hasEnded = hasCallLogStartedAndEnded(logData);
  if (!hasEnded) {
    return { canComment: false, state: "picked" };
  }
  return { canComment: true, state: "active" };
};

export const CallLogStatusNotice = ({ state, logData, onOpenRating }) => {
  const currentRating = Number(logData?.rating ?? logData?.ratingByCustomer ?? 0);
  const hasRating = currentRating > 0;
  const agentName = (logData?.receivedBy || logData?.AssignedEmpName || "").trim();

  // 1. Live Call Running State: Minimalist Apple HIG locked composer placeholder (44pt touch standard)
  if (state === "running") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          height: 44,
          px: 2,
          borderRadius: "22px",
          bgcolor: "#F2F2F7",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          color: "#8E8E93",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          userSelect: "none",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 15, color: "#8E8E93" }} />
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#8E8E93",
            letterSpacing: "-0.01em",
          }}
        >
          Comments unlock after call ends
        </Typography>
      </Box>
    );
  }

  // 2. Queue State: Compact iOS pill placeholder
  if (state === "queue") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          height: 44,
          px: 2,
          borderRadius: "22px",
          bgcolor: "#F2F2F7",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          color: "#8E8E93",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          userSelect: "none",
        }}
      >
        <HourglassEmptyRoundedIcon sx={{ fontSize: 16, color: "#8E8E93" }} />
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#8E8E93",
            letterSpacing: "-0.01em",
          }}
        >
          Waiting for agent to pick call…
        </Typography>
      </Box>
    );
  }

  // 3. Picked / Attended State: Compact iOS pill placeholder
  if (state === "picked") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          height: 44,
          px: 2,
          borderRadius: "22px",
          bgcolor: "#F2F2F7",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          color: "#8E8E93",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          userSelect: "none",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 15, color: "#8E8E93" }} />
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#8E8E93",
            letterSpacing: "-0.01em",
          }}
        >
          Call attended {agentName ? `• ${agentName}` : ""} — comments unlock after call ends
        </Typography>
      </Box>
    );
  }

  // 4. Closed / Concluded State: Clean, compact Apple HIG card with rating
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        borderRadius: "14px",
        bgcolor: "#F9FAFB",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0, flex: 1 }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "#34C759", flexShrink: 0 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, color: "#1C1C1E", fontSize: "0.8125rem", lineHeight: 1.2 }}>
            Call Completed
          </Typography>
          <Typography sx={{ color: "#8E8E93", fontSize: "0.71875rem", mt: 0.2 }}>
            This call has concluded. Comments are closed.
          </Typography>
        </Box>
      </Box>

      {/* Right side: Rate button or star rating */}
      <Box sx={{ flexShrink: 0 }}>
        {!hasRating && onOpenRating && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<StarRoundedIcon sx={{ color: "#FF9500", fontSize: 15 }} />}
            onClick={() => onOpenRating(logData?.sr)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.75rem",
              py: 0.4,
              px: 1.2,
              borderRadius: "9999px",
              borderColor: "rgba(255, 149, 0, 0.35)",
              bgcolor: "rgba(255, 149, 0, 0.08)",
              color: "#C25E00",
              "&:hover": {
                bgcolor: "rgba(255, 149, 0, 0.14)",
                borderColor: "rgba(255, 149, 0, 0.5)",
              },
            }}
          >
            Rate Call
          </Button>
        )}

        {hasRating && (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Rating value={currentRating} readOnly size="small" sx={{ color: "#FF9500", fontSize: "0.95rem" }} />
            <Typography sx={{ fontWeight: 600, color: "#34C759", fontSize: "0.75rem" }}>
              ({currentRating}/5)
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

const CallLogClosedNotice = (props) => {
  const state = props.state || (isCallLogClosed(props.logData) ? "closed" : getCallLogCommentState(props.logData).state);
  return <CallLogStatusNotice {...props} state={state} />;
};

export default CallLogClosedNotice;
