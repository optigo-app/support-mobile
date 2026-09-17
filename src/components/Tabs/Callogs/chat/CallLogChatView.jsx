import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CallLogMessageList, { parseCommentsData, deduplicateComments } from "./CallLogMessageList";
import CallLogCommentInput from "./CallLogCommentInput";
import CallLogClosedNotice, {
  isCallLogClosed,
  getCallLogCommentState,
  ActiveCallLiveBanner,
} from "./CallLogClosedNotice";
import { commentUpdates$ } from "../../../../rxjs/commentEvents";

const CallLogChatView = ({
  logData,
  currentUser,
  onPreviewFile,
  onOpenRating,
  onCommentSuccess,
}) => {
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    if (logData?.comment) {
      const parsed = parseCommentsData(logData.comment);
      setLocalComments((prev) => {
        if (prev.length === 0) return parsed;

        // Keep optimistic items that have not yet arrived in parsed
        const now = Date.now();
        const pendingOptimistic = prev.filter((p) => {
          const isOpt =
            p.isOptimistic ||
            String(p.id).startsWith("temp-") ||
            String(p.id).startsWith("optimistic-");
          if (!isOpt) return false;

          const pText = (p.text || p.comment || "").trim();
          const pFile = (p.FilePath || p.img || "").trim();

          const alreadyInParsed = parsed.some((item) => {
            const itemText = (item.text || item.comment || "").trim();
            const itemFile = (item.FilePath || item.img || "").trim();
            return itemText === pText && itemFile === pFile;
          });

          if (alreadyInParsed) return false;

          const pTime = new Date(p.time || 0).getTime();
          return now - pTime < 15000;
        });

        return deduplicateComments([...parsed, ...pendingOptimistic]);
      });
    } else {
      setLocalComments([]);
    }
  }, [logData?.comment, logData?.sr]);

  // Real-time RxJS comment stream subscription
  useEffect(() => {
    const sub = commentUpdates$.subscribe((commentData) => {
      const callId = commentData?.CallLogId ?? commentData?.sr ?? commentData?.callLogId;
      if (logData?.sr && String(callId) === String(logData.sr)) {
        const rawText = (commentData.Comments ?? commentData.comment ?? commentData.text ?? "").trim();
        const rawFile = (commentData.FilePath || commentData.img || "").trim();
        if (!rawText && !rawFile) return;

        const isClient =
          commentData.IsClient === 1 ||
          commentData.isClient === 1 ||
          commentData.isClient === true ||
          commentData.IsClient === "1" ||
          (currentUser?.id && String(commentData.CreatedBy) === String(currentUser.id))
            ? 1
            : 0;

        const newComment = {
          id: commentData.id || `comment-${Date.now()}`,
          text: rawText,
          comment: rawText,
          time: commentData.CreatedDate || commentData.time || new Date().toISOString(),
          CreatedDate: commentData.CreatedDate || commentData.time || new Date().toISOString(),
          Name: commentData.Name || (isClient ? currentUser?.fullName || currentUser?.firstname || "You" : "Support Agent"),
          IsClient: isClient,
          isClient: isClient,
          img: rawFile,
          FilePath: rawFile,
        };

        setLocalComments((prev) => {
          // Check if an existing item has the same real ID or matching content
          const existsIndex = prev.findIndex((c) => {
            if (newComment.id && c.id && String(c.id) === String(newComment.id)) return true;
            const cText = (c.text || c.comment || "").trim();
            const cFile = (c.FilePath || c.img || "").trim();
            return cText === rawText && cFile === rawFile;
          });

          if (existsIndex >= 0) {
            // Replace matching (e.g. optimistic) item with confirmed server item
            const updated = [...prev];
            updated[existsIndex] = newComment;
            return deduplicateComments(updated);
          }
          return deduplicateComments([...prev, newComment]);
        });
      }
    });

    return () => sub.unsubscribe();
  }, [logData?.sr, currentUser]);

  const handleCommentAdded = (newComment) => {
    setLocalComments((prev) => deduplicateComments([...prev, newComment]));
    if (onCommentSuccess) {
      onCommentSuccess(newComment);
    }
  };

  const commentState = getCallLogCommentState(logData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Pinned Apple HIG Active Call Dynamic Capsule */}
      <ActiveCallLiveBanner logData={logData} />

      {/* Scrollable messages container */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          px: { xs: 1, sm: 2 },
          pb: 1,
          WebkitOverflowScrolling: "touch",
        }}
      >
        <CallLogMessageList
          comments={localComments}
          currentUser={currentUser}
          logData={logData}
          onPreviewFile={onPreviewFile}
        />
      </Box>

      {/* Fixed Bottom Composer / Locked or Closed State Notice */}
      <Box
        sx={{
          flexShrink: 0,
          width: "100%",
          zIndex: 10,
          bgcolor: "#ffffff",
        }}
      >
        {!commentState.canComment ? (
          <Box sx={{ px: { xs: 1.5, sm: 2 }, pb: 2 }}>
            <CallLogClosedNotice
              state={commentState.state}
              logData={logData}
              onOpenRating={onOpenRating}
            />
          </Box>
        ) : (
          <CallLogCommentInput
            user={currentUser}
            callId={logData?.sr}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </Box>
    </Box>
  );
};

export default CallLogChatView;
