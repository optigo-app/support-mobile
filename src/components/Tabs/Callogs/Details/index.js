import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Stack,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Card,
  Badge,
} from "@mui/material";
import {
  PersonRounded,
  SupportAgentRounded,
  AccessTimeRounded,
  CalendarTodayRounded,
  AppsRounded,
  DescriptionRounded,
  StarRounded,
  ChatBubbleRounded,
  AttachFileRounded,
  InfoRounded,
  CloseRounded,
  FilePresentRounded,
} from "@mui/icons-material";
import SwipeableBottomDrawer from "../../../ui/SwipeableDrawer";
import RatingCard from "../../../ui/RatingCard";
import UniversalPreviewDrawer from "../../../ui/Previewer";
import { formatToISTAmPm, FormatTime, formatRobustDate } from "../../../../utils/dateFormatter";
import { useAuth } from "../../../../contexts/AuthContext";
import CallLogChatView from "../chat/CallLogChatView";
import { parseCommentsData } from "../chat/CallLogMessageList";
import { isCallLogClosed, isCallLogAccepted } from "../chat/CallLogClosedNotice";

const COLORS = {
  primary: "#4A66FF",
  textPrimary: "#1A1A1A",
  textSecondary: "#777777",
  bgLight: "#F0F2F5",
};

const CallLogDetailPage = ({ open, onClose, onCloseRatingOpen, logData }) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(1); // Default to Chat tab
  const [previewFileUrl, setPreviewFileUrl] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedTab(1); // Always open Chat section first by default
    }
  }, [open, logData?.sr]);

  const getAvatarGradient = () => "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)";

  const isClosed = isCallLogClosed(logData);

  // Parse comments and extract attachments
  const commentsList = useMemo(() => {
    return parseCommentsData(logData?.comment);
  }, [logData?.comment]);

  const allAttachments = useMemo(() => {
    const list = [];
    commentsList.forEach((c) => {
      const raw = c?.img || c?.FilePath || c?.attachment;
      if (typeof raw === "string" && raw.trim() && raw !== "null" && raw !== "undefined") {
        const urls = raw.split(",").map((u) => u.trim()).filter(Boolean);
        urls.forEach((url, idx) => {
          list.push({
            id: `${c?.id || "att"}-${idx}`,
            url,
            user: c?.Name || "User",
            time: c?.time || c?.date || "",
            fileName: url.split("/").pop().split("?")[0],
          });
        });
      } else if (raw?.preview) {
        list.push({
          id: `${c?.id || "att"}-0`,
          url: raw.preview,
          user: c?.Name || "User",
          time: c?.time || c?.date || "",
          fileName: raw?.name || raw.preview.split("/").pop().split("?")[0],
        });
      }
    });
    return list;
  }, [commentsList]);

  const handleOpenPreview = (fileUrl) => {
    if (!fileUrl) return;
    setPreviewFileUrl(fileUrl);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFileUrl(null);
  };

  return (
    <>
      <SwipeableBottomDrawer open={Boolean(open)} onClose={onClose}>
        {/* --- HEADER --- */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1.5, px: { xs: 2, md: 3 }, flexShrink: 0 }}
        >
          <Box sx={{ pr: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: COLORS.textSecondary,
                fontWeight: 700,
                letterSpacing: 1,
                lineHeight: 1,
              }}
            >
              Support Call
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.2 }}>
              CallID #{logData?.sr}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            {!logData?.rating && isClosed && (
              <Chip
                onClick={() => onCloseRatingOpen && onCloseRatingOpen(logData?.sr)}
                label={
                  <Stack direction="row" alignItems="center" spacing={0.7}>
                    <StarRounded style={{ fontSize: 16 }} />
                    <span>Rate this</span>
                  </Stack>
                }
                size="small"
                sx={{
                  bgcolor: "rgba(255,200,0,0.12)",
                  color: "#CA8A04",
                  fontWeight: 600,
                  fontSize: 12.5,
                  borderRadius: 12,
                  px: 1.2,
                  height: 28,
                  "& .MuiChip-label": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    px: 0.5,
                  },
                }}
              />
            )}
            <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f1f5f9" }}>
              <CloseRounded fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* --- COMPACT SEGMENTED PILL SWITCHER --- */}
        <Box sx={{ px: { xs: 1.5, sm: 2 }, mb: 1.5, flexShrink: 0 }}>
          <Box
            sx={{
              display: "flex",
              p: 0.5,
              bgcolor: "#f1f5f9",
              borderRadius: "14px",
              gap: 0.5,
            }}
          >
            {[
              { id: 0, label: "Info" },
              { id: 1, label: "Chat", count: commentsList.length },
              { id: 2, label: "Files", count: allAttachments.length },
            ].map((tab) => {
              const isSelected = selectedTab === tab.id;
              return (
                <Box
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  sx={{
                    flex: 1,
                    py: 0.7,
                    px: 0.5,
                    borderRadius: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.6,
                    bgcolor: isSelected ? "#ffffff" : "transparent",
                    color: isSelected ? "#4A66FF" : "#64748b",
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: "0.78rem",
                    boxShadow: isSelected ? "0 2px 6px rgba(0, 0, 0, 0.06)" : "none",
                    transition: "all 0.18s ease",
                    userSelect: "none",
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        lineHeight: 1,
                        px: 0.6,
                        py: 0.25,
                        borderRadius: "10px",
                        bgcolor: isSelected ? "#eff6ff" : "#e2e8f0",
                        color: isSelected ? "#4A66FF" : "#475569",
                      }}
                    >
                      {tab.count}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* --- TAB CONTENT --- */}
        <Box sx={{ flex: 1, minHeight: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* TAB 0: DETAILS */}
          {selectedTab === 0 && (
            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: { xs: 2, md: 3 }, pt: 0, maxWidth: 600, mx: "auto", width: "100%" }}>
              {/* Company & Date/Time Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  mb: 2.5,
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    fontSize: 20,
                    fontWeight: 700,
                    background: getAvatarGradient(),
                    borderRadius: 2.5,
                    boxShadow: "0 4px 12px rgba(74, 102, 255, 0.2)",
                  }}
                >
                  {logData?.company ? logData.company.charAt(0).toUpperCase() : "T"}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5, color: COLORS.textPrimary }}>
                    {logData?.company}
                  </Typography>

                  <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <CalendarTodayRounded sx={{ fontSize: 13, color: COLORS.textSecondary }} />
                      <Typography variant="caption" fontWeight={500} color="text.secondary" sx={{ fontSize: "0.78rem" }}>
                        {FormatTime(logData?.date)}
                      </Typography>
                    </Box>

                    <Box sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "#cbd5e1" }} />

                    <Box display="flex" alignItems="center" gap={0.5}>
                      <AccessTimeRounded sx={{ fontSize: 13, color: COLORS.textSecondary }} />
                      <Typography variant="caption" fontWeight={500} color="text.secondary" sx={{ fontSize: "0.78rem" }}>
                        {formatToISTAmPm(logData?.time)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Participants Grid */}
              <Grid container spacing={2} sx={{ mb: 2.5 }}>
                <Grid item xs={6}>
                  <InfoCard icon={<PersonRounded sx={{ color: "#2563eb" }} />} label="Call By" value={logData?.callBy} bg="#eff6ff" />
                </Grid>
                <Grid item xs={6}>
                  {(() => {
                    const isAccepted = isCallLogAccepted(logData);
                    const attendName = isAccepted
                      ? (logData?.receivedBy || logData?.AssignedEmpName || "Assigned")
                      : "Unassigned (In Queue)";
                    return (
                      <InfoCard
                        icon={<SupportAgentRounded sx={{ color: isAccepted ? "#059669" : "#d97706" }} />}
                        label="Attend By"
                        value={attendName}
                        bg={isAccepted ? "#ecfdf5" : "#fffbeb"}
                      />
                    );
                  })()}
                </Grid>
              </Grid>

              {/* App Name & Description Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.06)",
                  mb: 2.5,
                }}
              >
                {logData?.appname && (
                  <Box mb={2}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AppsRounded sx={{ fontSize: 18, color: COLORS.textSecondary }} />
                      <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
                        App Name
                      </Typography>
                    </Box>
                    <Chip
                      label={logData?.appname}
                      size="small"
                      sx={{
                        borderRadius: 1,
                        fontWeight: 600,
                        bgcolor: COLORS.bgLight,
                        color: COLORS.textPrimary,
                      }}
                    />
                    <Divider sx={{ my: 2 }} />
                  </Box>
                )}

                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <DescriptionRounded sx={{ fontSize: 18, color: COLORS.textSecondary }} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
                      Description
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: "0.85rem",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {logData?.description || "No description provided."}
                  </Typography>
                </Box>
              </Paper>

              {/* Rating & Feedback */}
              {!!logData?.rating && (
                <RatingCard
                  rating={logData?.rating}
                  feedback={logData?.feedback}
                  user={logData?.callBy}
                  time={logData?.RatingDateTime}
                />
              )}
            </Box>
          )}

          {/* TAB 1: CHAT & COMMENTS */}
          {selectedTab === 1 && (
            <CallLogChatView
              logData={logData}
              currentUser={user}
              onPreviewFile={handleOpenPreview}
              onOpenRating={onCloseRatingOpen}
            />
          )}

          {/* TAB 2: ATTACHMENTS */}
          {selectedTab === 2 && (
            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: { xs: 2, md: 3 }, pt: 0, maxWidth: 600, mx: "auto", width: "100%" }}>
              {allAttachments.length === 0 ? (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    color: "#94a3b8",
                  }}
                >
                  <FilePresentRounded sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#475569" }}>
                    No attachments found
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                    Files and images shared in call comments will appear here.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={1.5}>
                  {allAttachments.map((file) => {
                    const formattedDate = formatRobustDate(file.time);
                    const isImg = /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(file.url);

                    return (
                      <Card
                        key={file.id}
                        onClick={() => handleOpenPreview(file.url)}
                        sx={{
                          p: 1.5,
                          borderRadius: 2.5,
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          "&:hover": {
                            borderColor: "#4A66FF",
                            boxShadow: "0 2px 8px rgba(74, 102, 255, 0.12)",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: 2,
                              bgcolor: isImg ? "#eff6ff" : "#f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              flexShrink: 0,
                            }}
                          >
                            {isImg ? (
                              <img
                                src={file.url}
                                alt=""
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <FilePresentRounded sx={{ color: "#2563eb", fontSize: 24 }} />
                            )}
                          </Box>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" noWrap sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.82rem" }}>
                              {file.fileName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.72rem" }}>
                              Shared by {file.user} · {formattedDate?.smart || formattedDate?.relative}
                            </Typography>
                          </Box>
                        </Stack>
                      </Card>
                    );
                  })}
                </Stack>
              )}
            </Box>
          )}
        </Box>
      </SwipeableBottomDrawer>

      {/* Full-screen Media / Document Previewer */}
      <UniversalPreviewDrawer
        open={isPreviewOpen}
        onClose={handleClosePreview}
        fileUrl={previewFileUrl}
      />
    </>
  );
};

// --- SUB-COMPONENT ---
const InfoCard = ({ icon, label, value, bg }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 3,
      border: "1px solid rgba(0,0,0,0.06)",
      height: "100%",
    }}
  >
    <Avatar
      sx={{
        width: 38,
        height: 38,
        bgcolor: bg,
        mb: 1.2,
      }}
    >
      {icon}
    </Avatar>
    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: "0.75rem" }}>
      {label}
    </Typography>
    <Typography variant="subtitle2" fontWeight={700} sx={{ textTransform: "capitalize", color: "#1e293b" }}>
      {value || "-"}
    </Typography>
  </Paper>
);

export default CallLogDetailPage;
