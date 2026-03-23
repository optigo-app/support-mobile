import { useState } from "react";
import { Card, Box, Typography, Rating, Avatar, IconButton, Collapse } from "@mui/material";
import { StarRounded, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import {FormatTime} from '../../utils/dateFormatter'

export default function RatingCard({ rating, feedback, user, time }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
        background: "#ffffff",
        overflow: "hidden",
        mb: 2.5,
        transition: "all 0.25s ease",
      }}
    >
      {/* Header Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setOpen(!open)}
        sx={{
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent", // native mobile feel
        }}
      >
        <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 15 }}>
          Rating
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            icon={<StarRounded fontSize="inherit" />}
            emptyIcon={<StarRounded fontSize="inherit" />}
            sx={{
              "& .MuiRating-iconFilled": { color: "#FACC15" },
            }}
          />
          <IconButton size="small">{open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}</IconButton>
        </Box>
      </Box>

      {/* Collapsible Section */}
      <Collapse in={open} timeout={260}>
        <Box sx={{ mt: 2, pl: 0.3 }}>
          {/* User Info */}
          <Box display="flex" alignItems="center" gap={1.2} mb={1}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#EEF2FF",
                color: "#4F46E5",
                fontWeight: 700,
                textTransform:'uppercase'
              }}
            >
              {user?.charAt(0)}
            </Avatar>

            <Box>
              <Typography fontSize={14.5} fontWeight={600}
              
              textTransform={'capitalize'}>
                {user}
              </Typography>
              <Typography fontSize={12} color="#94A3B8">
                {FormatTime(time ,"datetime") || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Remark */}
          <Typography fontSize={14} color="#475569" sx={{ lineHeight: 1.55, mt: 1 }}>
            {feedback}
          </Typography>
        </Box>
      </Collapse>
    </Card>
  );
}
