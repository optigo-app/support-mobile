import React, { useState, useRef } from "react";
import { Box, Paper, Avatar, TextField, IconButton, Stack, Button, Typography, CircularProgress } from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { filesUploadApi } from "./../../../../apis/UploadFille"; // Adjust path as needed
import { useTicket } from "../../../../contexts/useTicket";
import { compressImagesToWebP } from "../../../../utils/ImageCompressor";

const MobileCommentBox = ({ user, TicketNo }) => {
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false); // UI state for compression
  const fileRef = useRef(null);
  const { AddComment } = useTicket();

  // 1. Handle File Selection with Validation (15MB Limit)
  // const handleFileUpload = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB
  //   const validFiles = [];
  //   const invalidFiles = [];

  //   selectedFiles.forEach((file) => {
  //     if (file.size <= maxSizeInBytes) {
  //       validFiles.push({
  //         file,
  //         id: Math.random().toString(36).substr(2, 9),
  //         preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
  //         name: file.name,
  //         size: file.size,
  //       });
  //     } else {
  //       invalidFiles.push(file);
  //     }
  //   });

  //   if (invalidFiles.length > 0) {
  //     const errorMsg = invalidFiles.map((f) => f.name).join(", ");
  //     alert(`File(s) too large (Max 15MB): ${errorMsg}`);
  //   }

  //   setFiles((prev) => [...prev, ...validFiles]);
  //   e.target.value = null; // Reset input so same file can be selected again if needed
  // };

    const handleFileUpload = async (e) => {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length === 0) return;
  
      const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB
      const validFilesToProcess = [];
      const invalidFiles = [];
  
      // A. Initial Size Validation
      selectedFiles.forEach((file) => {
        if (file.size <= maxSizeInBytes) {
          validFilesToProcess.push(file);
        } else {
          invalidFiles.push(file);
        }
      });
  
      if (invalidFiles.length > 0) {
        const errorMsg = invalidFiles.map((f) => f.name).join(", ");
        alert(`File(s) too large (Max 15MB): ${errorMsg}`);
      }
  
      if (validFilesToProcess.length === 0) {
        e.target.value = null;
        return;
      }
  
      try {
        setIsCompressing(true);
  
        // B. Separate Images for Compression
        const imageFiles = validFilesToProcess.filter((f) => f.type.startsWith("image/"));
        const otherFiles = validFilesToProcess.filter((f) => !f.type.startsWith("image/"));
  
        let compressedImages = [];
  
        // C. Compress Images
        if (imageFiles.length > 0) {
          compressedImages = await compressImagesToWebP(imageFiles);
        }
  
        // D. Format Compressed Images back to State Object
        const formattedImages = compressedImages.map((img) => {
          // Reconstruct File object from Blob
          const fileObj = new File([img.blob], img.compressedName, {
            type: "image/webp",
            lastModified: new Date().getTime(),
          });
  
          return {
            file: fileObj,
            id: Math.random().toString(36).substr(2, 9),
            preview: img.previewUrl,
            name: img.compressedName,
            size: fileObj.size, // Update size to compressed size
          };
        });
  
        // E. Format Other Files
        const formattedOthers = otherFiles.map((file) => ({
          file: file,
          id: Math.random().toString(36).substr(2, 9),
          preview: null,
          name: file.name,
          size: file.size,
        }));
  
        // F. Update State
        setFiles((prev) => [...prev, ...formattedImages, ...formattedOthers]);
  
      } catch (error) {
        console.error("Error processing files:", error);
        alert("Error processing images.");
      } finally {
        setIsCompressing(false);
        e.target.value = null; // Reset input
      }
    };
  

  const removeFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async () => {
    if (!comment.trim() && files.length === 0) return;

    setIsSubmitting(true);
    let uploadFilePath = null;

    try {
      // A. Upload Files if exist
      if (files.length > 0) {
        const rawFiles = files.map((f) => f.file);
        uploadFilePath = await filesUploadApi({
          ukey: user?.ukey,
          folderName: "Ticket",
          uniqueNo: TicketNo,
          attachments: rawFiles,
        });
      }

      // B. Construct Payload
      const newComment = {
        TicketNo: TicketNo,
        time: new Date().toISOString(),
        message: comment,
        name: user?.id,
        attachment: uploadFilePath?.files
          ? {
              preview: uploadFilePath.files.map((file) => file.url).join(","),
              name: uploadFilePath.files[0]?.fileName,
            }
          : null,
        Role: 1, 
        isOfficeUseOnly: false, 
        customerId : user?.custid ,
        UserId : user?.id,
      };

      await AddComment(newComment);
      setComment("");
      setFiles([]);
    } catch (error) {
      console.error("Comment Error", error);
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={3} 
      sx={{
        position: "relative", 
        bottom: 0,
        width: "100%",
        borderRadius: "12px 12px 0 0",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {/* Header Info */}
      <Box sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0", bgcolor: "#f8f9fa" }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#e5e7eb",
              color: "#111",
              fontSize: "0.8rem",
            }}
          >
            {user?.fullName ? user.fullName?.charAt(0)?.toUpperCase() : "U"}
          </Avatar>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "0.85rem" ,textTransform: "capitalize" }}>
            Replying as {user?.fullName || "User"}
          </Typography>
        </Stack>
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, pb: 1 }}>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          variant="standard"
          disabled={isSubmitting}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: "0.95rem" },
          }}
        />

        {/* File Previews */}
        {files.length > 0 && (
          <Box sx={{ mt: 2, maxHeight: "150px", overflowY: "auto" }}>
            <Stack spacing={1}>
              {files.map((fileObj) => (
                <Paper
                  key={fileObj.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    bgcolor: "#fafafa",
                    p: 0.5,
                    pl: 1,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {/* Thumbnail */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1,
                        overflow: "hidden",
                        flexShrink: 0,
                        bgcolor: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {fileObj.preview ? <img src={fileObj.preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <InsertDriveFileRoundedIcon sx={{ color: "#757575", fontSize: 20 }} />}
                    </Box>

                    {/* Name */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" noWrap sx={{ fontSize: "0.8rem" }}>
                        {fileObj.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                        {formatFileSize(fileObj.size)}
                      </Typography>
                    </Box>

                    {/* Remove */}
                    <IconButton size="small" onClick={() => removeFile(fileObj.id)} disabled={isSubmitting}>
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Actions Toolbar */}
      <Box sx={{ p: 1.5, pt: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <IconButton 
          onClick={() => fileRef.current.click()}
                    disabled={isSubmitting || isCompressing}
            sx={{ color: "#555", border: "1px solid #eee" }}
             size="small"
             >
             {isCompressing ? (
             <CircularProgress size={24} /> 
          ) : (
             <AttachFileRoundedIcon />
          )}
          </IconButton>

          <input type="file" ref={fileRef} hidden multiple onChange={handleFileUpload} accept="image/*,application/pdf,.doc,.docx" />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={(!comment.trim() && files.length === 0) || isSubmitting}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              background: `linear-gradient(135deg, #ec14d0ff 0%, #532ebe 100%)`,
              opacity: isSubmitting ? 0.7 : 1,
              color: "#fff",
            }}
            endIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <SendRoundedIcon fontSize="small" sx={{ color: "#fff" }} />}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MobileCommentBox;
