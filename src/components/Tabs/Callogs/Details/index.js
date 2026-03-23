import { Box, Typography, Avatar, Paper, Grid, Divider, Stack, Rating, Chip, useTheme } from "@mui/material";
import { PersonRounded, SupportAgentRounded, AccessTimeRounded, CalendarTodayRounded, AppsRounded, DescriptionRounded, StarRounded } from "@mui/icons-material";
import SwipeableBottomDrawer from "../../../ui/SwipeableDrawer"; // Assuming this path exists based on your snippet
import RatingCard from "../../../ui/RatingCard";
import { formatToISTAmPm, FormatTime } from "../../../../utils/dateFormatter";

const COLORS = {
  primary: "#4A66FF",
  textPrimary: "#1A1A1A",
  textSecondary: "#777777",
  bgLight: "#F0F2F5",
};

const CallLogDetailPage = ({ open, onClose, onCloseRatingOpen, logData }) => {
  const getAvatarGradient = () => "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)";

  return (
    <SwipeableBottomDrawer open={open} onClose={onClose}>
      {/* --- HEADER --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, px: { xs: 2, md: 3 } }}>
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
          <Typography variant={"h6"} sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.2 }}>
            CallID {logData?.sr}
          </Typography>
        </Box>
        {!logData?.rating && (
          <Chip
          disabled={!logData?.callClosed}
            onClick={()=>onCloseRatingOpen(logData?.sr)}
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
      </Stack>
      {/* --- CONTENT --- */}
      <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              p: 2, // Reduced padding for compactness
              borderRadius: 3,
              mb: 3,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
              display: "flex", // Horizontal layout
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* 1. Compact Avatar */}
            <Avatar
              sx={{
                width: 50, // Much smaller (Compact)
                height: 50,
                fontSize: 20,
                fontWeight: 700,
                background: getAvatarGradient(),
                borderRadius: 2.5, // Squircle shape looks more modern/compact
                boxShadow: "0 4px 12px rgba(74, 102, 255, 0.2)",
              }}
            >
              {logData?.company ? logData.company?.charAt(0).toUpperCase() : "T"}
            </Avatar>

            {/* 2. details Column */}
            <Box sx={{ flex: 1 }}>
              {/* Company Name */}
              <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5, color: COLORS.textPrimary }}>
                {logData?.company}
              </Typography>

              {/* Formatted Date & Time Row */}
              <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                {/* Date */}
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CalendarTodayRounded sx={{ fontSize: 14, color: COLORS.textSecondary }} />
                  <Typography variant="caption" fontWeight={500} color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                    {FormatTime(logData?.date)}
                  </Typography>
                </Box>

                {/* Divider Dot */}
                <Box
                  sx={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    bgcolor: "#cbd5e1",
                  }}
                />

                {/* Time */}
                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTimeRounded sx={{ fontSize: 14, color: COLORS.textSecondary }} />
                  <Typography variant="caption" fontWeight={500} color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                    {formatToISTAmPm(logData?.time)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* 2. PARTICIPANTS GRID */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <InfoCard icon={<PersonRounded sx={{ color: "#2563eb" }} />} label="Call By" value={logData?.callBy} bg="#eff6ff" />
            </Grid>
            <Grid item xs={6}>
              <InfoCard icon={<SupportAgentRounded sx={{ color: "#059669" }} />} label="Attend By" value={logData?.receivedBy || "Unassigned"} bg="#ecfdf5" />
            </Grid>
          </Grid>

          {/* 3. DETAILS: App Name & Description */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,0.06)",
              mb: 3,
            }}
          >
            {/* App Name (Conditional) */}
            {logData?.appname && (
              <Box mb={2}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <AppsRounded sx={{ fontSize: 20, color: COLORS.textSecondary }} />
                  <Typography variant="subtitle2" color="text.secondary">
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

            {/* Description */}
            {logData?.description && (
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <DescriptionRounded sx={{ fontSize: 20, color: COLORS.textSecondary }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    lineHeight: 1.6,
                    whiteSpace: "normal", // allow wrapping
                    wordBreak: "break-word", // avoid overflow for long text
                  }}
                >
                  {logData?.description || "No description provided."}
                </Typography>
              </Box>
            )}
          </Paper>

          {/* 4. RATING & FEEDBACK (Only if available) */}
          {!!logData?.rating && <RatingCard 
          rating={logData?.rating}
          feedback={logData?.feedback}
          user={logData?.callBy}
          time={logData?.RatingDateTime}
          />}
        </Box>
      </Box>
    </SwipeableBottomDrawer>
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
        width: 40,
        height: 40,
        bgcolor: bg,
        mb: 1.5,
      }}
    >
      {icon}
    </Avatar>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}
    </Typography>
    <Typography variant="subtitle1" fontWeight={600} sx={{ textTransform: "capitalize" }}>
      {value || "-"}
    </Typography>
  </Paper>
);

export default CallLogDetailPage;
