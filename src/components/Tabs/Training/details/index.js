import React, { useMemo, useState } from "react";
import { Box, Button, Typography, Avatar, Chip, Divider, Grid, IconButton, Paper, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Close as CloseIcon, CalendarTodayRounded, AccessTimeRounded, LocationOnRounded, TimerRounded, PlayCircleFilledWhiteRounded, BusinessRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded, PersonRounded, StarRounded } from "@mui/icons-material";
import SwipeableBottomDrawer from "../../../ui/SwipeableDrawer";
import { formatRobustDate } from "../../../../utils/dateFormatter";
import { extractRecordingLink } from "../../../../utils/Filtering";
import UniversalPreviewDrawer from "../../../ui/Previewer";
import RatingCard from "../../../ui/RatingCard";

export const colors = {
  bg: "#F9FAFB",
  surface: "#FFFFFF",
  textPrimary: "#111827", // Dark grey/black
  textSecondary: "#6B7280", // Muted grey
  border: "#E5E7EB",
  primary: "#2563EB", // Modern Blue
  primaryBg: "#EFF6FF",
  success: "#059669",
  successBg: "#ECFDF5",
  warning: "#D97706",
  warningBg: "#FFFBEB",
  danger: "#DC2626",
  dangerBg: "#FEF2F2",
  textPrimary: "#1A1A1A",
  textSecondary: "#777777",
  successBg: "rgba(58, 248, 126, 0.08)",
  successText: "#0f8c3a",
  pendingBg: "rgba(74, 102, 255, 0.08)",
  pendingText: "#4A66FF",
  warningBg: "rgba(255, 153, 102, 0.08)",
  warningText: "#FF9966",
  neutralBg: "rgba(0, 0, 0, 0.06)",
  neutralText: "#555",
};

const InfoItem = ({ icon, label, value }) => (
  <Grid item xs={6} sm={4}>
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          mt: 0.3,
          color: colors.textSecondary,
          display: "flex",
        }}
      >
        {React.cloneElement(icon, { fontSize: "small" })}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            color: colors.textSecondary,
            fontWeight: 500,
            display: "block",
            lineHeight: 1.2,
            mb: 0.3,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: colors.textPrimary,
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {value || "-"}
        </Typography>
      </Box>
    </Stack>
  </Grid>
);

const AttendeesSection = ({ attendees }) => {
  if (!attendees || attendees.length === 0) return null;

  const displayCount = attendees.length;

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            opacity: 0.8,
          }}
        >
          Attendees <span style={{ color: colors?.textSecondary, fontWeight: 500 }}>({displayCount})</span>
        </Typography>
      </Stack>
      {/* Collapsed View: Wrapped Chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          flex: 1,
        }}
      >
        {attendees?.map((attendee, i) => (
          <Stack
            key={i}
            direction="row"
            alignItems="center"
            sx={{
              px: 0.6,
              py: 0.6,
              borderRadius: 15,
              bgcolor: colors.surface,
              border: `1px solid ${colors.border}`,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: colors.bgHover,
                borderColor: colors.primary,
              },
            }}
          >
            <Avatar
              sx={{
                width: 22,
                height: 22,
                fontSize: "0.75rem",
                fontWeight: 700,
                mr: 1,
                bgcolor: colors.primaryBg,
                color: colors.primary,
              }}
            >
              {attendee.charAt(0).toUpperCase()}
            </Avatar>

            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.76rem", pr: 0.4 }}>
              {attendee}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

const TrainingDetailsDrawer = ({ trainingData, open, onClose, onRatingOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { rating, ratingDesc, ratingDate, ratingBy, hasTraining, TrainingType, trainingLink, ticketNo, status, title, attendeesList, dateFormatted, trainerName, duration, projectCode, trainingMode } = useMemo(() => {
    if (!trainingData) return {};
    const d = formatRobustDate(trainingData?.TrainingDate);
    const hasTraining = extractRecordingLink(trainingData?.Details || "");
    return {
      ticketNo: trainingData.TicketNo,
      status: trainingData.Status,
      title: trainingData.TrainingType,
      rating: trainingData.Rating,
      ratingDesc: trainingData.RatingDesc,
      ratingDate: trainingData.RatingDate,
      ratingBy: trainingData.RatingBy,
      attendeesList: trainingData.Attendees
        ? trainingData.Attendees.split(",")
          .map((s) => s.trim())
          .filter(Boolean)
        : [],
      dateFormatted: d?.calendar,
      trainerName: trainingData.TrainingBy || "Unassigned",
      duration: trainingData.DurationTime?.toFixed(2),
      projectCode: trainingData.Projectcode,
      trainingMode: trainingData.TrainingMode,
      hasTraining,
      trainingLink: extractRecordingLink(trainingData?.Details || ""),
      TrainingType: trainingData?.TrainingType,
    };
  }, [trainingData]);

  function getStatusStyle(status) {
    const normalized = status?.toLowerCase() || "";
    if (normalized === "completed") {
      return { bg: colors.successBg, text: colors.successText };
    } else if (normalized === "pending" || normalized === "in progress") {
      return { bg: colors.pendingBg, text: colors.pendingText };
    } else if (normalized === "overdue") {
      return { bg: colors.warningBg, text: colors.warningText };
    }
    return { bg: colors.neutralBg, text: colors.neutralText };
  }

  const statusStyle = getStatusStyle(status);

  const handleOpenPreview = (sessionData) => {
    setSelectedFile(sessionData);
    setOpenDrawer(true);
  };

  return (
    <>
      <SwipeableBottomDrawer open={Boolean(open)} onClose={onClose}>
        <Box
          sx={{
            px: isMobile ? 2.5 : 4,
            pb: 4,
            overflowY: "auto",
            maxHeight: "calc(85vh - 30px)",
            // Smooth scrolling
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box sx={{ pr: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 700,
                  letterSpacing: 1,
                  lineHeight: 1,
                }}
              >
                TICKET #{ticketNo}
              </Typography>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.2 }}>
                {title}
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ bgcolor: colors.bg, mt: -0.5, mr: -1 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          {/* Status & Rating Bar */}
          <Stack direction="row" spacing={2} justifyContent={"space-between"} alignItems="center" sx={{ mb: 3 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                bgcolor: statusStyle.bg,
                color: statusStyle.text,
                fontWeight: 700,
                borderRadius: 15,
                fontSize: 12.5,
                borderRadius: 12,
                px: 1.2,
                height: 28,
              }}
            />

            {!rating && <Chip
              onClick={onRatingOpen}
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
            />}
          </Stack>

          <Divider sx={{ mb: 3, borderColor: colors.border, opacity: 0.6 }} />

          {/* Details Grid */}
          <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
            <InfoItem icon={<BusinessRounded sx={{ height: 18, width: 18 }} />} label="Company" value={projectCode} />
            <InfoItem icon={<CalendarTodayRounded sx={{ height: 18, width: 18 }} />} label="Date" value={dateFormatted} />
            <InfoItem icon={<TimerRounded sx={{ height: 18, width: 18 }} />} label="Duration" value={duration} />
            <InfoItem icon={<LocationOnRounded sx={{ height: 18, width: 18 }} />} label="Mode" value={trainingMode} />
            <InfoItem icon={<AccessTimeRounded sx={{ height: 18, width: 18 }} />} label="Training Type" value={TrainingType} />
          </Grid>

          {/* Trainer Card */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                opacity: 0.8,
              }}
            >
              Trainer
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 1, sm: 1.5 },
                border: `1px solid ${colors.border}`,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, sm: 2 },
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: colors.textPrimary,
                  color: colors.surface,
                  width: { xs: 36, sm: 44 },
                  height: { xs: 36, sm: 44 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {trainerName?.charAt(0)}
              </Avatar>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {trainerName}
                </Typography>

                <Typography
                  sx={{
                    color: colors.textSecondary,
                    fontSize: { xs: "0.68rem", sm: "0.75rem" },
                    mt: 0.2,
                  }}
                >
                  Training Specialist
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Attendees (Optimized) */}

          <AttendeesSection attendees={attendeesList} />

          {trainingData?.remarks && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  opacity: 0.8,
                }}
              >
                Remarks
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.3, sm: 1.5 },
                  border: `1px solid ${colors.border}`,
                  borderRadius: 2.5,
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(6px)",
                  lineHeight: 1.55,
                  fontSize: 13.5,
                  color: "#475569",
                  wordBreak: "normal",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {trainingData?.remarks || "No remarks"}
              </Paper>
            </Box>
          )}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                opacity: 0.8,
              }}
            >
              Detail
            </Typography>

            {trainingData?.Details && (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  border: `1px solid ${colors.border}`,
                  borderRadius: 2.5,
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 2 },
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Box
                  pl={1}
                  sx={{
                    wordBreak: "break-word",
                    wordWrap: "break-word",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: trainingData?.Details,
                  }}
                ></Box>
              </Paper>
            )}
          </Box>

          {/* Action Button */}
          {hasTraining && (
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    opacity: 0.8,
                  }}
                >
                  Recorded Session
                </Typography>
              </Stack>

              <Button
                onClick={() => handleOpenPreview(trainingLink)}
                fullWidth
                variant="contained"
                startIcon={
                  <PlayCircleFilledWhiteRounded
                    sx={{
                      width: 20,
                      height: 20,
                      color: "#fff",
                    }}
                  />
                }
                sx={{
                  py: { xs: 1.4, sm: 1.6 },
                  borderRadius: 4,
                  textTransform: "none",
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 600,

                  background: "linear-gradient(135deg, #4A66FF 0%, #2640FF 100%)",
                  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.22)",

                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#FFF",
                  justifyContent: "flex-start",
                  "& .MuiButton-startIcon": {
                    marginRight: 1,
                    marginLeft: 0,
                  },
                  transition: "0.25s ease",
                }}
              >
                Watch Session Recording
              </Button>
            </Box>
          )}

          {!!rating && <RatingCard rating={rating} feedback={ratingDesc} user={ratingBy} time={ratingDate} />}
          <Box sx={{ height: 20 }} />
        </Box>
      </SwipeableBottomDrawer>
      <UniversalPreviewDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} fileUrl={selectedFile} />
    </>
  );
};

export default TrainingDetailsDrawer;
