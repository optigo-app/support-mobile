import React, { useRef, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import CallLogMessageItem from "./CallLogMessageItem";

export const parseCommentsData = (rawComment) => {
  if (!rawComment) return [];
  if (Array.isArray(rawComment)) return rawComment;

  if (typeof rawComment === "string") {
    const trimmed = rawComment.trim();
    if (!trimmed || trimmed === "null" || trimmed === "undefined" || trimmed === "[]") {
      return [];
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === "object" && parsed !== null) return [parsed];
      return [];
    } catch (e) {
      // If it's a plain text string comment
      return [
        {
          id: 1,
          text: trimmed,
          time: new Date().toISOString(),
          Name: "User",
          IsClient: 1,
        },
      ];
    }
  }

  if (typeof rawComment === "object" && rawComment !== null) {
    return [rawComment];
  }

  return [];
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
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
