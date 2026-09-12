import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CallLogMessageList, { parseCommentsData } from "./CallLogMessageList";
import CallLogCommentInput from "./CallLogCommentInput";
import CallLogClosedNotice, {
  isCallLogClosed,
  getCallLogCommentState,
  ActiveCallLiveBanner,
} from "./CallLogClosedNotice";

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
      setLocalComments(parseCommentsData(logData.comment));
    } else {
      setLocalComments([]);
    }
  }, [logData?.comment, logData?.sr]);

  const handleCommentAdded = (newComment) => {
    setLocalComments((prev) => [...prev, newComment]);
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
