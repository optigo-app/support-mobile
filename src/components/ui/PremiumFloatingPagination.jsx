import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function PremiumFloatingPagination({ page, rowsPerPage, count, onPageChange }) {
  const totalPages = Math.ceil(count / rowsPerPage);
  if (totalPages <= 1) return null;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,

        // Softer warm gradient (more premium)
        background: "linear-gradient(135deg, #FFB77A 0%, #FF9354 100%)",

        borderRadius: 6,
        px: 1,
        py: 0,

        display: "flex",
        alignItems: "center",
        gap: 1.5,
        boxShadow: "0 6px 16px rgba(255,140,80,0.28)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        minWidth: 150,
        height: 35,
      }}
    >
      {/* Left Arrow */}
      <IconButton
        onClick={() => page > 0 && onPageChange(null, page - 1)}
        sx={{
          width: 24,
          height: 24,
          bgcolor: "rgba(255, 255, 255, 1)",
          "&:active": { bgcolor: "rgba(255,255,255,1)" },
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
      >
        <ChevronLeft sx={{ fontSize: 18 }} />
      </IconButton>

      {/* Page Number */}
      <Box sx={{ textAlign: "center", flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13, // smaller
            lineHeight: 1,
          }}
        >
          {page + 1} / {totalPages}
        </Typography>

        <Typography
          sx={{
            fontSize: 10.2,
            opacity: 0.9,
            lineHeight: 1.1,
          }}
        >
          {rowsPerPage} rows
        </Typography>
      </Box>

      {/* Right Arrow */}
      <IconButton
        onClick={() => page < totalPages - 1 && onPageChange(null, page + 1)}
        sx={{
          width: 24,
          height: 24,
          bgcolor: "rgba(255, 255, 255, 1)",
          "&:active": { bgcolor: "rgba(255,255,255,1)" },
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
      >
        <ChevronRight sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}
