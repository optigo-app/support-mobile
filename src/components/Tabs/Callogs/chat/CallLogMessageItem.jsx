import React from "react";
import { Box, Typography, Avatar, Chip, Paper } from "@mui/material";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

export const getInitials = (name, fallback = "U") => {
  if (!name || typeof name !== "string") return fallback;
  const cleaned = name.trim();
  if (!cleaned) return fallback;
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const formatCommentTime = (rawTime) => {
  if (!rawTime) return "";
  try {
    // If it's a "HH:mm:ss" format
    if (typeof rawTime === "string" && rawTime.includes(":") && !rawTime.includes("T") && !rawTime.includes("-")) {
      const parts = rawTime.split(":");
      const h = parseInt(parts[0], 10);
      const m = parts[1]?.slice(0, 2) || "00";
      if (!isNaN(h)) {
        const ampm = h >= 12 ? "PM" : "AM";
        const h12 = h % 12 || 12;
        return `${h12}:${m} ${ampm}`;
      }
    }

    const d = new Date(rawTime);
    if (!isNaN(d.getTime())) {
      const now = new Date();
      const isToday = d.toDateString() === now.toDateString();
      const timeOnly = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });

      if (isToday) {
        return timeOnly; // e.g. "12:38 PM"
      }

      const dayMonth = d.toLocaleDateString([], { month: "short", day: "numeric" });
      return `${dayMonth}, ${timeOnly}`; // e.g. "9 Sep, 12:38 PM"
    }
  } catch (e) {}

  return String(rawTime);
};

const CallLogMessageItem = ({ comment, currentUser, logData, onPreviewFile }) => {
  const callerName = (logData?.callBy || currentUser?.fullName || currentUser?.company || "").trim();
  const commentAuthor = (comment?.Name || comment?.sender || "").trim();

  // Precise Client vs Agent detection matching support.optigo
  const isClient = Boolean(
    comment?.isClient === 1 ||
    comment?.IsClient === 1 ||
    comment?.IsClient === "1" ||
    comment?.isClient === true ||
    (currentUser?.id && String(comment?.UserId) === String(currentUser.id)) ||
    (callerName && commentAuthor && commentAuthor.toLowerCase() === callerName.toLowerCase()) ||
    (currentUser?.fullName && commentAuthor && commentAuthor.toLowerCase() === currentUser.fullName.toLowerCase()) ||
    (currentUser?.company && commentAuthor && commentAuthor.toLowerCase() === currentUser.company.toLowerCase()) ||
    (currentUser?.firstname && commentAuthor && commentAuthor.toLowerCase() === currentUser.firstname.toLowerCase())
  );

  const authorName = isClient
    ? (commentAuthor || callerName || "You")
    : (commentAuthor || logData?.receivedBy || "Support Agent");

  const initials = getInitials(authorName, isClient ? "OC" : "SA");
  const timeDisplay = formatCommentTime(comment?.time || comment?.CreatedDate || comment?.date || comment?.entryDate);
  const messageText = comment?.text || comment?.comment || comment?.Comments || "";

  // Attachment parsing
  const rawAttachment = comment?.img || comment?.FilePath || comment?.attachment;
  let attachmentUrl = null;
  if (typeof rawAttachment === "string" && rawAttachment.trim() && rawAttachment !== "null") {
    attachmentUrl = rawAttachment.split(",")[0].trim();
  } else if (rawAttachment?.preview) {
    attachmentUrl = rawAttachment.preview;
  }

  const isImageAttachment = attachmentUrl
    ? /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(attachmentUrl) || attachmentUrl.includes("image")
    : false;

  const fileName = attachmentUrl ? attachmentUrl.split("/").pop().split("?")[0] : "Attachment";

  // ==========================================
  // CLIENT COMMENT -> RIGHT SIDE
  // ==========================================
  if (isClient) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          gap: 1.2,
          px: { xs: 1, sm: 2 },
          py: 0.8,
          mb: 1,
          width: "100%",
          boxSizing: "border-box",
          animation: "smoothMessageSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          "@keyframes smoothMessageSlideIn": {
            "0%": {
              opacity: 0,
              transform: "translateY(12px) scale(0.98)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          },
        }}
      >
        {/* Header + Bubble Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            maxWidth: "78%",
          }}
        >
          {/* Header Info: Time on Left, Author Name on Right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.4 }}>
            <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 500 }}>
              {timeDisplay}
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a" }}>
              {authorName}
            </Typography>
          </Box>

          {/* Right Bubble */}
          <Paper
            elevation={0}
            sx={{
              p: 1.4,
              px: 1.8,
              borderRadius: "18px 18px 4px 18px",
              background: "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)",
              color: "#ffffff",
              boxShadow: "0 2px 10px rgba(74, 102, 255, 0.2)",
            }}
          >
            {messageText && (
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#ffffff",
                  lineHeight: 1.45,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {messageText}
              </Typography>
            )}

            {/* Attachment preview */}
            {attachmentUrl && (
              <Box
                sx={{ mt: messageText ? 1 : 0, cursor: "pointer" }}
                onClick={() => onPreviewFile && onPreviewFile(attachmentUrl)}
              >
                {isImageAttachment ? (
                  <Box
                    sx={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      maxWidth: 200,
                      maxHeight: 140,
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    <img
                      src={attachmentUrl}
                      alt="Attachment"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </Box>
                ) : (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 0.6,
                      px: 1,
                      borderRadius: "6px",
                      bgcolor: "rgba(255,255,255,0.18)",
                      borderColor: "rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      color: "#ffffff",
                    }}
                  >
                    <InsertDriveFileRoundedIcon sx={{ fontSize: 17, color: "#ffffff" }} />
                    <Typography variant="caption" noWrap sx={{ fontWeight: 600, fontSize: "0.72rem", maxWidth: 140 }}>
                      {fileName}
                    </Typography>
                  </Paper>
                )}
              </Box>
            )}
          </Paper>
        </Box>

        {/* Client Avatar on the Right */}
        <Avatar
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "#4A66FF",
            color: "#ffffff",
            fontSize: "0.72rem",
            fontWeight: 800,
            flexShrink: 0,
            mt: 0.2,
            boxShadow: "0 2px 6px rgba(74, 102, 255, 0.25)",
          }}
        >
          {initials}
        </Avatar>
      </Box>
    );
  }

  // ==========================================
  // SUPPORT AGENT COMMENT -> LEFT SIDE
  // ==========================================
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 1.2,
        px: { xs: 1, sm: 2 },
        py: 0.8,
        mb: 1,
        width: "100%",
        boxSizing: "border-box",
        animation: "smoothMessageSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "@keyframes smoothMessageSlideIn": {
          "0%": {
            opacity: 0,
            transform: "translateY(12px) scale(0.98)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
      }}
    >
      {/* Support Agent Avatar on the Left */}
      <Avatar
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          bgcolor: "#0284C7",
          color: "#ffffff",
          fontSize: "0.72rem",
          fontWeight: 800,
          flexShrink: 0,
          mt: 0.2,
          boxShadow: "0 2px 6px rgba(2, 132, 199, 0.2)",
        }}
      >
        {initials}
      </Avatar>

      {/* Header + Bubble Column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: "78%",
        }}
      >
        {/* Header Info: Author Name on Left, Agent Badge, Time on Right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.4 }}>
          <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a" }}>
            {authorName}
          </Typography>
          <Chip
            label="Agent"
            size="small"
            sx={{
              height: 16,
              fontSize: "0.62rem",
              fontWeight: 700,
              bgcolor: "#e0f2fe",
              color: "#0369a1",
              borderRadius: "4px",
              "& .MuiChip-label": { px: 0.6 },
            }}
          />
          <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 500 }}>
            {timeDisplay}
          </Typography>
        </Box>

        {/* Left Bubble */}
        <Paper
          elevation={0}
          sx={{
            p: 1.4,
            px: 1.8,
            borderRadius: "4px 18px 18px 18px",
            bgcolor: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          {messageText && (
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#0f172a",
                lineHeight: 1.45,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {messageText}
            </Typography>
          )}

          {/* Attachment preview */}
          {attachmentUrl && (
            <Box
              sx={{ mt: messageText ? 1 : 0, cursor: "pointer" }}
              onClick={() => onPreviewFile && onPreviewFile(attachmentUrl)}
            >
              {isImageAttachment ? (
                <Box
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    maxWidth: 200,
                    maxHeight: 140,
                    border: "1px solid #cbd5e1",
                  }}
                >
                  <img
                    src={attachmentUrl}
                    alt="Attachment"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </Box>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 0.6,
                    px: 1,
                    borderRadius: "6px",
                    bgcolor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    color: "#0f172a",
                  }}
                >
                  <InsertDriveFileRoundedIcon sx={{ fontSize: 17, color: "#0284c7" }} />
                  <Typography variant="caption" noWrap sx={{ fontWeight: 600, fontSize: "0.72rem", maxWidth: 140 }}>
                    {fileName}
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CallLogMessageItem;
