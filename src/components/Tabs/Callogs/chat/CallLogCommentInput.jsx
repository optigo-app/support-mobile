import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Avatar,
  TextField,
  IconButton,
  Stack,
  Button,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { filesUploadApi } from "../../../../apis/UploadFille";
import { useCallLog } from "../../../../contexts/UseCallLog";
import { compressImagesToWebP } from "../../../../utils/ImageCompressor";

const CallLogCommentInput = ({ user, callId, onCommentAdded, disabled = false }) => {
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);
  const { addComment } = useCallLog();

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB
    const validFilesToProcess = [];
    const invalidFiles = [];

    selectedFiles.forEach((file) => {
      if (file.size <= maxSizeInBytes) {
        validFilesToProcess.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      const errorMsg = invalidFiles.map((f) => f.name).join(", ");
      alert(`File(s) exceed 15MB limit: ${errorMsg}`);
    }

    if (validFilesToProcess.length === 0) {
      e.target.value = null;
      return;
    }

    try {
      setIsCompressing(true);
      const imageFiles = validFilesToProcess.filter((f) => f.type.startsWith("image/"));
      const otherFiles = validFilesToProcess.filter((f) => !f.type.startsWith("image/"));

      let compressedImages = [];
      if (imageFiles.length > 0) {
        compressedImages = await compressImagesToWebP(imageFiles);
      }

      const formattedImages = compressedImages.map((img) => {
        const fileObj = new File([img.blob], img.compressedName, {
          type: "image/webp",
          lastModified: Date.now(),
        });

        return {
          file: fileObj,
          id: Math.random().toString(36).substring(2, 9),
          preview: img.previewUrl,
          name: img.compressedName,
          size: fileObj.size,
        };
      });

      const formattedOthers = otherFiles.map((file) => ({
        file: file,
        id: Math.random().toString(36).substring(2, 9),
        preview: null,
        name: file.name,
        size: file.size,
      }));

      setFiles((prev) => [...prev, ...formattedImages, ...formattedOthers]);
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Failed to process attachment image.");
    } finally {
      setIsCompressing(false);
      e.target.value = null;
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment && files.length === 0) return;
    if (isSubmitting || disabled) return;

    setIsSubmitting(true);
    let uploadedFileUrl = "";

    try {
      // 1. Upload files if any attached
      if (files.length > 0) {
        try {
          const rawFiles = files.map((f) => f.file);
          const uploadRes = await filesUploadApi({
            ukey: user?.ukey,
            folderName: "CallLog",
            uniqueNo: callId || "1",
            attachments: rawFiles,
          });

          if (uploadRes?.files && uploadRes.files.length > 0) {
            uploadedFileUrl = uploadRes.files.map((f) => f.url).join(",");
          }
        } catch (uploadErr) {
          console.error("File upload error, continuing with text comment:", uploadErr);
        }
      }

      // 2. Call context addComment
      const result = await addComment(callId, trimmedComment, uploadedFileUrl);

      // 3. Trigger optimistic update callback
      if (onCommentAdded) {
        const optimisticComment = {
          id: Date.now(),
          Name: user?.fullName || user?.firstname + " " + (user?.lastname || "") || "You",
          text: trimmedComment,
          time: new Date().toISOString(),
          img: uploadedFileUrl || null,
          FilePath: uploadedFileUrl || null,
          IsClient: 1,
          isClient: 1,
          Role: 1,
          UserId: user?.id,
        };
        onCommentAdded(optimisticComment);
      }

      // 4. Reset input
      setComment("");
      setFiles([]);
    } catch (error) {
      console.error("Failed to post comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (disabled) return null;

  const userInitial = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : user?.firstname
    ? user.firstname.charAt(0).toUpperCase()
    : "U";

  return (
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "#ffffff",
        mt: "auto",
      }}
    >
      {/* Header Info: Replying as... */}
      <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #f1f5f9", bgcolor: "#f8fafc" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: "#4A66FF",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {userInitial}
          </Avatar>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "#475569", fontSize: "0.8rem" }}>
            Replying as <strong style={{ color: "#1e293b" }}>{user?.fullName || "You"}</strong>
          </Typography>
        </Stack>
      </Box>

      {/* Input Area */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message or comment..."
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          variant="standard"
          disabled={isSubmitting}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: "0.9rem",
              lineHeight: 1.45,
              color: "#1e293b",
              "& textarea::placeholder": { color: "#94a3b8", opacity: 1 },
            },
          }}
        />

        {/* File Preview Chips */}
        {files.length > 0 && (
          <Box sx={{ mt: 1.5, maxHeight: "120px", overflowY: "auto" }}>
            <Stack spacing={0.8}>
              {files.map((fileObj) => (
                <Paper
                  key={fileObj.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#f8fafc",
                    borderColor: "#e2e8f0",
                    p: 0.6,
                    px: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1.5,
                      overflow: "hidden",
                      flexShrink: 0,
                      bgcolor: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {fileObj.preview ? (
                      <img
                        src={fileObj.preview}
                        alt="preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <InsertDriveFileRoundedIcon sx={{ color: "#64748b", fontSize: 18 }} />
                    )}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" noWrap sx={{ fontSize: "0.78rem", fontWeight: 600, color: "#1e293b" }}>
                      {fileObj.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                      {formatFileSize(fileObj.size)}
                    </Typography>
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() => removeFile(fileObj.id)}
                    disabled={isSubmitting}
                    sx={{ p: 0.4, color: "#94a3b8", "&:hover": { color: "#ef4444" } }}
                  >
                    <CloseRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Action Toolbar */}
      <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          multiple
          onChange={handleFileUpload}
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
        />

        <Tooltip title="Attach Image or Document" arrow placement="top">
          <span>
            <IconButton
              size="small"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              disabled={isSubmitting || isCompressing}
              sx={{
                color: files.length > 0 ? "#4A66FF" : "#64748b",
                bgcolor: files.length > 0 ? "#eff6ff" : "transparent",
                border: "1px solid",
                borderColor: files.length > 0 ? "#bfdbfe" : "#e2e8f0",
                borderRadius: "10px",
                p: 0.8,
              }}
            >
              {isCompressing ? (
                <CircularProgress size={18} sx={{ color: "#4A66FF" }} />
              ) : (
                <AttachFileRoundedIcon sx={{ fontSize: 19 }} />
              )}
            </IconButton>
          </span>
        </Tooltip>

        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={(!comment.trim() && files.length === 0) || isSubmitting}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            px: 2.5,
            py: 0.6,
            fontWeight: 700,
            fontSize: "0.82rem",
            background: "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)",
            boxShadow: "0 2px 8px rgba(74, 102, 255, 0.3)",
            color: "#ffffff !important",
            "&:disabled": {
              background: "#e2e8f0",
              color: "#94a3b8 !important",
              boxShadow: "none",
            },
          }}
          endIcon={
            isSubmitting ? (
              <CircularProgress size={14} sx={{ color: "inherit" }} />
            ) : (
              <SendRoundedIcon sx={{ fontSize: 16 }} />
            )
          }
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Paper>
  );
};

export default CallLogCommentInput;
