import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  FormLabel,
  IconButton,
  Grid,
  Button,
  Stack,
  Container,
  Drawer,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  ArrowForwardIosRounded as ArrowForwardIosRoundedIcon,
  AddIcCallRounded as AddIcCallRoundedIcon,
  AttachFileRounded as AttachFileRoundedIcon,
  CloseRounded as CloseRoundedIcon,
  InsertDriveFileRounded as InsertDriveFileRoundedIcon,
} from "@mui/icons-material";
import { EmailScrollArea } from "../../../ui/ScrollArea";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCallLog } from "../../../../contexts/UseCallLog";
import { filesUploadApi } from "../../../../apis/UploadFille";
import { compressImagesToWebP } from "../../../../utils/ImageCompressor";
import { AppNameButton, CustomField, colors, getCurrentDateTime, labelStyle } from "./utils";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

export default function AddTaskFormDrawer({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Contexts
  const { user } = useAuth();
  const { companyOptions, APPNAME_LIST, addCall } = useCallLog();
  const [loading, setloading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({ description: "" });
  const fileInputRef = useRef(null);

  // Unified State (Reduces render cycles)
  const [formState, setFormState] = useState({
    selectedAppId: null,
    currentDate: "",
    currentTime: "",
    displayCompanyName: "",
    companyNameValue: "",
    customerName: "",
    description: "",
  });

  // Calculate Company Info - Memoized to prevent recalculation on every render
  const companyInfo = useMemo(() => {
    if (!companyOptions || !user?.companycode) return null;
    return companyOptions.find(
      (option) => option?.label?.split("/")?.[0]?.toLowerCase() === user.companycode.toLowerCase()
    );
  }, [companyOptions, user?.companycode]);

  // Initialization Logic
  useEffect(() => {
    if (open) {
      const { date, time } = getCurrentDateTime();

      setFormState({
        selectedAppId: null,
        currentDate: date,
        currentTime: time,
        displayCompanyName: companyInfo?.label || "",
        companyNameValue: companyInfo?.value || "",
        customerName: user?.fullName || "",
        description: "",
      });
      setFiles([]);
      setErrors({ description: "" });
    }
  }, [open, companyInfo, user?.fullName]);

  // Handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (name === "description" && value.trim()) {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  }, []);

  const handleAppSelect = useCallback((appId) => {
    setFormState((prev) => ({ ...prev, selectedAppId: appId }));
  }, []);

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

  const handleSubmit = useCallback(async () => {
    if (!formState.description || !formState.description.trim()) {
      setErrors({ description: "Description is required" });
      return;
    }

    setloading(true);
    let uploadedFileUrl = "";

    try {
      // 1. Upload attachments if any attached
      if (files.length > 0) {
        try {
          const rawFiles = files.map((f) => f.file);
          const uploadRes = await filesUploadApi({
            ukey: user?.ukey,
            folderName: "CallLog",
            uniqueNo: "1",
            attachments: rawFiles,
          });

          if (uploadRes?.files && uploadRes.files.length > 0) {
            uploadedFileUrl = uploadRes.files.map((f) => f.url).join(",");
          }
        } catch (uploadErr) {
          console.error("Attachment upload error, continuing with call:", uploadErr);
        }
      }

      // 2. Reformat date for API: dd-mm-yyyy to yyyy-mm-dd
      const [day, month, year] = (formState.currentDate || "").split("-");
      const formattedDate = `${year}-${month}-${day}`;

      const payload = {
        date: formattedDate,
        time: formState.currentTime,
        companyName: formState.companyNameValue,
        customerName: formState.customerName,
        description: formState.description.trim(),
        appId: formState.selectedAppId,
        CorpId: user?.id,
        source: "client",
        filePath: uploadedFileUrl || "",
        comments: uploadedFileUrl ? formState.description.trim() : "",
      };

      const res = await addCall(payload);
      if (res?.rd?.[0]?.stat_msg === "Call Added successfully" || res?.rd?.[0]?.stat === 1) {
        onClose();
      } else {
        throw new Error("Failed Add Call");
      }
    } catch (error) {
      console.error("Failed to add call:", error);
    } finally {
      setloading(false);
    }
  }, [formState, user?.id, user?.ukey, files, addCall, onClose]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{ zIndex: 9999999999 }}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : 420,
          borderRadius: isMobile ? 0 : "16px 0 0 16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <IconButton onClick={onClose} size="small" sx={{ border: `1px solid ${colors.border}` }}>
          <ArrowBackIosRoundedIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            color: colors.black,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          Add CallBack Request
          <AddIcCallRoundedIcon sx={{ mr: 1, color: "#16a34a" }} />
        </Typography>


      </Box>

      {/* Scrollable Content */}
      <EmailScrollArea>
        <Container maxWidth="sm" sx={{ pt: 3, pb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomField label="Start Date" value={formState.currentDate} icon={<ArrowDownIcon />} readOnly={true} />
            </Grid>
            <Grid item xs={6}>
              <CustomField label="Time" value={formState.currentTime} icon={<ArrowDownIcon />} readOnly={true} />
            </Grid>
          </Grid>

          {/* These fields won't re-render when you type in Description because props are stable */}
          <CustomField label="Company Name" placeholder="Company Name" name="companyNameValue" value={formState.displayCompanyName} disable={true} />

          <CustomField label="Customer Name" placeholder="Customer Name" name="customerName" value={formState.customerName} disable={true} />

          <CustomField
            label="Description"
            multiline
            placeholder="Add description..."
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            required={true}
            error={!!errors.description}
            helperText={errors.description}
          />

          {/* Attachments Section */}
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <FormLabel sx={labelStyle}>Attachments (Optional)</FormLabel>
              <input
                type="file"
                ref={fileInputRef}
                hidden
                multiple
                onChange={handleFileUpload}
                accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
              />
              <Button
                size="small"
                variant="outlined"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                disabled={loading || isCompressing}
                startIcon={
                  isCompressing ? (
                    <CircularProgress size={14} />
                  ) : (
                    <AttachFileRoundedIcon sx={{ fontSize: 16 }} />
                  )
                }
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  py: 0.4,
                  px: 1.5,
                  borderColor: colors.border,
                  color: "#4A66FF",
                  "&:hover": {
                    borderColor: "#4A66FF",
                    bgcolor: "rgba(74, 102, 255, 0.04)",
                  },
                }}
              >
                {isCompressing ? "Compressing..." : "Attach Files"}
              </Button>
            </Box>

            {files.length > 0 && (
              <Stack spacing={1} sx={{ mt: 1 }}>
                {files.map((fileObj) => (
                  <Paper
                    key={fileObj.id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      bgcolor: "#f8fafc",
                      borderColor: "#e2e8f0",
                      p: 0.8,
                      px: 1.2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
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
                        <InsertDriveFileRoundedIcon sx={{ color: "#64748b", fontSize: 20 }} />
                      )}
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" noWrap sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#1e293b" }}>
                        {fileObj.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "0.72rem", color: "#64748b" }}>
                        {formatFileSize(fileObj.size)}
                      </Typography>
                    </Box>

                    <IconButton
                      size="small"
                      onClick={() => removeFile(fileObj.id)}
                      disabled={loading}
                      sx={{ p: 0.4, color: "#94a3b8", "&:hover": { color: "#ef4444" } }}
                    >
                      <CloseRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>

          {/* App Selection */}
          <Box>
            <FormLabel sx={labelStyle}>Appname</FormLabel>
            <Stack
              direction="row"
              sx={{
                mt: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {APPNAME_LIST?.map((item) => (
                <AppNameButton key={item.AppId} label={item?.AppName} selected={formState.selectedAppId === item?.AppId} onClick={() => handleAppSelect(item?.AppId)} />
              ))}
            </Stack>
          </Box>
        </Container>
      </EmailScrollArea>

      {/* Footer Actions */}
      <Box
        sx={{
          p: 1.35,
          borderTop: `1px solid rgba(0,0,0,0.08)`,
          display: "flex",
          gap: 2,
          bgcolor: "#fff",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          sx={{
            height: 44,
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            height: 44,
            borderRadius: "50px",
            bgcolor: loading ? "#15803d" : "#16a34a",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "#15803d" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Add"}
        </Button>
      </Box>
    </Drawer>
  );
}
