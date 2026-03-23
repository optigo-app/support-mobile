import { Box, Typography, Avatar, Paper, Grid, Divider, Stack, Chip } from "@mui/material";
import { CalendarTodayRounded, CheckCircleRounded, AccessTimeRounded, AttachMoneyRounded, StarRounded } from "@mui/icons-material";
import SwipeableBottomDrawer from "../../../ui/SwipeableDrawer";
import { formatToISTAmPm, formatRobustDate } from "../../../../utils/dateFormatter";
import RatingCard from "../../../ui/RatingCard";
import { getStatusStyle } from "../../../../utils/FiltersOptions";

const COLORS = {
  primary: "#4A66FF",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  bgLight: "#F9FAFB",
  divider: "rgba(0,0,0,0.06)",
  // Status Colors
  successBg: "rgba(34, 197, 94, 0.1)",
  successText: "#15803d",
  pendingBg: "rgba(59, 130, 246, 0.1)",
  pendingText: "#1d4ed8",
  errorBg: "rgba(239, 68, 68, 0.1)",
  errorText: "#b91c1c",
  warnBg: "rgba(245, 158, 11, 0.1)",
  warnText: "#b45309",
};

// --- Helper: Get Status Styles ---
const getStatusConfig = (status) => {
  const s = status?.toLowerCase() || "";
  if (s === "delivered" || s === "completed" || s === "paid") return { bg: COLORS.successBg, color: COLORS.successText, icon: <CheckCircleRounded sx={{ fontSize: 14 }} /> };
  if (s === "pending" || s === "processing" || s === "unpaid") return { bg: COLORS.warnBg, color: COLORS.warnText, icon: <AccessTimeRounded sx={{ fontSize: 14 }} /> };
  if (s === "cancelled") return { bg: COLORS.errorBg, color: COLORS.errorText, icon: <AccessTimeRounded sx={{ fontSize: 14 }} /> };

  return { bg: COLORS.bgLight, color: COLORS.textSecondary, icon: <AccessTimeRounded sx={{ fontSize: 14 }} /> };
};

const OrderDetailDrawer = ({ open, onClose, logData ,onCloseRatingOpen }) => {
  const getAvatarGradient = (name) => {
    return "linear-gradient(135deg, #4A66FF 0%, #1D42FF 100%)";
  };

  const statusStyle = getStatusConfig(logData?.Status);
  const paymentStyle = getStatusConfig(logData?.PaymentStatus);

  const date = formatRobustDate(logData?.Date);
  const RequestDate = formatRobustDate(logData?.RequestDate);

  return (
    <SwipeableBottomDrawer open={open} onClose={onClose}>
      <Box sx={{ px: 3, mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0 }}>
              <Typography variant="overline" sx={{ color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 0.5 }}>
                Order No
              </Typography>
            </Stack>

            <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.textPrimary, letterSpacing: -0.5 }}>
              #{logData?.OrderNo}
            </Typography>
          </Box>
        </Stack>
        <Stack mt={2} direction="row" spacing={2} justifyContent={"space-between"} alignItems="center" sx={{ mb: 3 }}>
          {logData?.Status && (
            <Chip
              label={logData?.Status}
              size="small"
              sx={{
                bgcolor: getStatusStyle(logData?.Status?.toLowerCase()).bg,
                color: getStatusStyle(logData?.Status?.toLowerCase()).color,
                fontWeight: 700,
                borderRadius: 15,
                fontSize: 12.5,
                borderRadius: 12,
                px: 1.2,
                height: 28,
              }}
            />
          )}

          {!logData?.RatingValue && (
            <Chip
              onClick={()=>onCloseRatingOpen(logData?.SrNo)}
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
      </Box>

      {/* --- SCROLLABLE CONTENT --- */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 3, pb: 5 }}>
        {/* 1. TOPIC & CLIENT CARD */}
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: `1px solid ${COLORS.divider}`, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: getAvatarGradient(),
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {logData?.ClientCode?.charAt(0).toUpperCase()}
            </Avatar>
            <Box flex={1}>
              <Typography variant="subtitle2" sx={{ color: COLORS.textSecondary, fontSize: 12 }}>
                Client / Created By
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: COLORS.textPrimary }}>
                {logData?.ClientCode}
              </Typography>
              <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
                {logData?.CreatedBy}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle2" sx={{ color: COLORS.textSecondary, mb: 0.5, fontSize: 12 }}>
              Topic ({logData?.TopicType})
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ lineHeight: 1.4 }}>
              {logData?.Topic}
            </Typography>
          </Box>
        </Paper>

        {/* 2. STATS GRID (Dates, Order No, Payment) */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <InfoCard icon={<CalendarTodayRounded sx={{ fontSize: 18, color: "#059669" }} />} label="Created Date" value={date?.full} bg="rgba(16, 185, 129, 0.08)" />
          </Grid>
          <Grid item xs={6}>
            <InfoCard icon={<CalendarTodayRounded sx={{ fontSize: 18, color: "#4F46E5" }} />} label="Request Date" value={RequestDate?.full} bg="rgba(79, 70, 229, 0.08)" />
          </Grid>
          <Grid item xs={6}>
            <InfoCard icon={<AttachMoneyRounded sx={{ fontSize: 18, color: paymentStyle.color }} />} label="Payment" value={logData?.PaymentStatus} bg="rgba(16, 185, 129, 0.08)" />
          </Grid>
          <Grid item xs={6}>
            <InfoCard icon={<AttachMoneyRounded sx={{ fontSize: 18, color: paymentStyle.color }} />} label="Service Type" value={logData?.ServiceType} bg="rgba(16, 185, 129, 0.08)" />
          </Grid>
        </Grid>
        {!!logData?.RatingValue && <RatingCard rating={logData?.RatingValue} feedback={logData?.RatingDescription} user={logData?.RatingBy} time={logData?.RatingDate} />}
        <Box>
          <Typography variant="subtitle2" sx={{ color: COLORS.textSecondary, mb: 1, fontWeight: 700 }}>
            DESCRIPTION & NOTES
          </Typography>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: COLORS.bgLight }}>
            <Typography variant="body2" sx={{ color: COLORS.textPrimary, lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {logData?.Description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <DetailRow label="Approval Status" value={logData?.ApprovedStatus} />
              <DetailRow label="Communication With" value={logData?.CommunicationWith} />
              <DetailRow label="Last Update" value={formatToISTAmPm(logData?.UpdatedAt)} />
            </Stack>
          </Paper>
        </Box>
      </Box>
    </SwipeableBottomDrawer>
  );
};

// --- Sub-Components ---

const InfoCard = ({ icon, label, value, bg }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 3,
      border: `1px solid ${COLORS.divider}`,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Avatar sx={{ width: 32, height: 32, bgcolor: bg, mb: 1.5, variant: "rounded" }}>{icon}</Avatar>
    <Box>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.2 }}>
        {label}
      </Typography>
      <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
        {value || "-"}
      </Typography>
    </Box>
  </Paper>
);

const DetailRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="caption" fontWeight={600} color="text.primary">
      {value || "-"}
    </Typography>
  </Stack>
);

export default OrderDetailDrawer;
