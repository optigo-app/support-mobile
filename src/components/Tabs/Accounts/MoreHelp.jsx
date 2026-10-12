import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SwipeableBottomDrawer from "../../ui/SwipeableDrawer";
import SupportSectionX from "./Help";

const SupportSection = ({ open, onClose }) => {
  return (
    <SwipeableBottomDrawer
      onClose={onClose}
      open={open}
      bgcolor="#F5F5F7"
      scrollable
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: { xs: 2, sm: 3 }, pt: 0.5, pb: 1, flexShrink: 0, py: 1 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1e293b" }}>
          Help & Support
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="Close" sx={{ bgcolor: "#ffffff" }}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: "pan-y",
          pb: 8,
        }}
      >
        <SupportSectionX />
      </Box>
    </SwipeableBottomDrawer>
  );
};

export default SupportSection;
