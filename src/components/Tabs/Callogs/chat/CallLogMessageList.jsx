import React, { useRef, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import CallLogMessageItem from "./CallLogMessageItem";

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
            time: new Date().toISOString(),
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
          time: new Date().toISOString(),
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
        text: item,
        comment: item,
        time: new Date().toISOString(),
        Name: "User",
        IsClient: 1,
        isClient: 1,
      };
    }
    const textVal = item.text ?? item.comment ?? item.Comments ?? item.Descr ?? "";
    const timeVal = item.time ?? item.CreatedDate ?? item.date ?? item.entryDate ?? "";
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
      text: textVal,
      comment: textVal,
      time: timeVal,
      CreatedDate: timeVal,
      Name: item.Name || item.CreatedByName || item.userName || (isClientVal ? "Client" : "Support Agent"),
      IsClient: isClientVal,
      isClient: isClientVal,
      FilePath: item.FilePath || item.img || item.filePath || "",
      img: item.FilePath || item.img || item.filePath || "",
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
    const hasRealId = item.id && !String(item.id).startsWith("comment-") && !String(item.id).startsWith("temp-") && !String(item.id).startsWith("optimistic-");
    
    // Normalize time to a rough 60-second window to catch duplicate socket/API dispatches
    const rawTime = item.time || item.CreatedDate || item.date || item.entryDate || "";
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

const CallLogMessageList = ({ comments = [], currentUser, logData, onPreviewFile }) => {
  const bottomRef = useRef(null);

  // Parse and sort comments chronologically (oldest first for natural chat flow)
  const normalizedComments = parseCommentsData(comments).sort((a, b) => {
    const timeA = a?.time ? new Date(a.time).getTime() : 0;
    const timeB = b?.time ? new Date(b.time).getTime() : 0;
    const validA = isNaN(timeA) ? 0 : timeA;
    const validB = isNaN(timeB) ? 0 : timeB;
    return validA - validB;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [normalizedComments.length]);

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
      <div ref={bottomRef} />
    </Box>
  );
};

export default CallLogMessageList;
