import React, { useRef, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import CallLogMessageItem from "./CallLogMessageItem";
import { getLocalISOString } from "../../../../utils/dateFormatter";

export const getCommentSortTimestamp = (timeVal, fallbackIndex = 0) => {
  if (!timeVal) return fallbackIndex;
  const str = String(timeVal).trim();
  if (!str || str.startsWith("1900") || str.startsWith("0000")) {
    return fallbackIndex;
  }

  // 1. Full datetime string with year/date (contains '-' or '/')
  if (str.includes("-") || str.includes("/")) {
    const clean = str.replace(/Z$/i, "").replace(" ", "T");
    const d = new Date(clean);
    if (!isNaN(d.getTime())) {
      return d.getTime();
    }
  }

  // 2. Time-only string: e.g. "10:58", "10:58 AM", "15:45", "11:00 PM"
  const match = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*([AaPp][Mm]))?$/);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
    const ampm = match[4]?.toUpperCase();

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const d = new Date();
    d.setHours(hours, minutes, seconds, 0);
    if (!isNaN(d.getTime())) {
      return d.getTime();
    }
  }

  // 3. Fallback to direct parse without Z
  const clean = str.replace(/Z$/i, "").replace(" ", "T");
  const d = new Date(clean);
  if (!isNaN(d.getTime())) {
    return d.getTime();
  }

  return fallbackIndex;
};

export const parseCommentsData = (rawComment) => {
  if (!rawComment) return [];
  let parsedList = [];

  if (Array.isArray(rawComment)) {
    parsedList = rawComment;
  } else if (typeof rawComment === "string") {
    const trimmed = rawComment.trim();
    if (!trimmed || trimmed === "null" || trimmed === "undefined" || trimmed === "[]") {
      return [];
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) parsedList = parsed;
      else if (typeof parsed === "object" && parsed !== null) parsedList = [parsed];
      else {
        parsedList = [
          {
            id: 1,
            text: trimmed,
            comment: trimmed,
            time: getLocalISOString(),
            Name: "User",
            IsClient: 1,
          },
        ];
      }
    } catch (e) {
      parsedList = [
        {
          id: 1,
          text: trimmed,
          comment: trimmed,
          time: getLocalISOString(),
          Name: "User",
          IsClient: 1,
        },
      ];
    }
  } else if (typeof rawComment === "object" && rawComment !== null) {
    parsedList = [rawComment];
  }

  // Deduplicate comments to prevent showing identical duplicate messages
  const normalizedList = parsedList.map((item, idx) => {
    if (typeof item === "string") {
      return {
        id: idx + 1,
        orderIndex: idx,
        text: item,
        comment: item,
        time: getLocalISOString(),
        Name: "User",
        IsClient: 1,
        isClient: 1,
      };
    }
    const textVal = item.text ?? item.comment ?? item.Comments ?? item.Descr ?? "";
    const rawTime = (item.time ?? item.CreatedDate ?? item.date ?? item.entryDate ?? getLocalISOString()).toString().replace(/Z$/i, "").replace(" ", "T");
    const isClientVal =
      item.IsClient === 1 ||
      item.isClient === 1 ||
      item.IsClient === "1" ||
      item.isClient === true
        ? 1
        : 0;

    return {
      ...item,
      id: item.id || item.Id || `comment-${idx}`,
      orderIndex: idx,
      text: textVal,
      comment: textVal,
      time: rawTime,
      CreatedDate: rawTime,
      Name: item.Name || item.CreatedByName || item.userName || (isClientVal ? "Client" : "Support Agent"),
      IsClient: isClientVal,
      isClient: isClientVal,
      FilePath: item.FilePath || item.img || item.filePath || "",
      img: item.FilePath || item.img || item.filePath || "",
      isNew: Boolean(item.isNew),
    };
  });

  return deduplicateComments(normalizedList);
};

export const deduplicateComments = (comments = []) => {
  if (!Array.isArray(comments) || comments.length === 0) return [];
  const seen = new Set();
  const result = [];

  for (const item of comments) {
    if (!item) continue;
    const text = (item.text ?? item.comment ?? item.Comments ?? "").trim();
    const file = (item.FilePath || item.img || "").trim();

    // If item has a real server ID, track it
    const hasRealId = item.id && !String(item.id).startsWith("comment-") && !String(item.id).startsWith("temp-") && !String(item.id).startsWith("optimistic-") && !String(item.id).startsWith("local-");
    
    // Normalize time to a rough 60-second window to catch duplicate socket/API dispatches
    const rawTime = (item.time || item.CreatedDate || item.date || item.entryDate || "").toString().replace(/Z$/i, "").replace(" ", "T");
    let timeBucket = "";
    if (rawTime) {
      const parsedTime = new Date(rawTime).getTime();
      if (!isNaN(parsedTime)) {
        timeBucket = Math.floor(parsedTime / 60000); // 1-minute bucket
      }
    }

    // Compose a deduplication key based on message content and time
    const dedupeKey = hasRealId 
      ? `id:${item.id}` 
      : `content:${text}:${file}:${timeBucket || "notime"}`;

    if (!seen.has(dedupeKey)) {
      seen.add(dedupeKey);
      result.push(item);
    }
  }

  return result;
};

const CallLogMessageList = ({ comments = [], currentUser, logData, onPreviewFile, scrollContainerRef }) => {
  const prevCountRef = useRef(0);
  const isInitialMountRef = useRef(true);

  // Parse and sort comments chronologically (oldest first for natural chat flow)
  const normalizedComments = useMemo(() => {
    const list = Array.isArray(comments) ? comments : parseCommentsData(comments);
    return [...list].sort((a, b) => {
      const timeA = getCommentSortTimestamp(a?.time || a?.CreatedDate, a?.orderIndex ?? 0);
      const timeB = getCommentSortTimestamp(b?.time || b?.CreatedDate, b?.orderIndex ?? 0);
      const diff = timeA - timeB;
      if (diff !== 0) return diff;
      return (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0);
    });
  }, [comments]);

  // Isolated scrolling: scrolls only the messages container, never the window or outer drawer!
  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    if (isInitialMountRef.current) {
      if (normalizedComments.length > 0) {
        isInitialMountRef.current = false;
        prevCountRef.current = normalizedComments.length;
        // Instant jump to bottom without smooth animation lag on initial mount
        container.scrollTop = container.scrollHeight;
      }
      return;
    }

    const isNew = normalizedComments.length > prevCountRef.current;
    prevCountRef.current = normalizedComments.length;

    if (isNew) {
      const scrollSmooth = () => {
        if (!container) return;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      };
      const rAF = requestAnimationFrame(scrollSmooth);
      const timer = setTimeout(scrollSmooth, 50);
      return () => {
        cancelAnimationFrame(rAF);
        clearTimeout(timer);
      };
    }
  }, [normalizedComments.length, scrollContainerRef]);

  if (normalizedComments.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        <Box
          sx={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            bgcolor: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          <QuestionAnswerRoundedIcon sx={{ fontSize: 28, color: "#cbd5e1" }} />
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#475569", mb: 0.5 }}>
          No comments yet
        </Typography>
        <Typography variant="caption" sx={{ color: "#94a3b8", maxWidth: 280, lineHeight: 1.4 }}>
          {logData?.receivedBy && String(logData.receivedBy).toLowerCase() !== "unassigned"
            ? "Comments and updates regarding this call will appear here."
            : "Your call request is waiting in queue. Comments will appear once an agent attends your call."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      {normalizedComments.map((comment, index) => (
        <CallLogMessageItem
          key={comment?.id || `comment-${index}`}
          comment={comment}
          currentUser={currentUser}
          logData={logData}
          onPreviewFile={onPreviewFile}
        />
      ))}
    </Box>
  );
};

export default CallLogMessageList;
