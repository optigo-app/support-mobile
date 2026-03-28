import React from "react";
import { AppBar, Box, IconButton, InputBase, Chip, Paper, Stack } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { MdCached } from "react-icons/md";

const COLORS = {
  textPrimary: "#1A1A1A",
  textSecondary: "#777777",
  bgLight: "#F0F2F5",
  border: "rgba(0, 0, 0, 0.08)",
};

const GmailStyleHeader = ({
  FilteringOptions,
  onSearch,
  onFilterChange,
  searchQuery,
  title,
  activeFilter,
  count,
  onRefresh,
  isRefreshing
}) => {

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        borderBottom: `1px solid ${COLORS.border}`,
        color: COLORS.textPrimary,
        top: 0,
        zIndex: 1100,
        borderRadius: 0,
        borderTop: "none !important",
        /* Remove shadows (AppBar / Paper / Drawer) */
        boxShadow: "none !important",

        /* Remove MUI elevation & pseudo dividers */
        "&::before": {
          display: "none !important",
        },
        "&::after": {
          display: "none !important",
        },
      }}
    >
      {/* Search Bar Section */}
      <Box sx={{ px: { xs: 1, sm: 1.2 }, pb: 1.5, mt: 2.4 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 12,
            bgcolor: COLORS.bgLight,
            boxShadow: "none",
            height: 44,
            px: 1,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <IconButton type="button" sx={{ p: "8px", color: COLORS.textSecondary }} aria-label="search">
            <FiSearch size={20} />
          </IconButton>
          <InputBase
            sx={{ ml: 0, flex: 1, fontWeight: 500 }}
            placeholder={`Search ${title}`}
            inputProps={{ "aria-label": `search ${title}` }}
            onChange={onSearch}
            value={searchQuery}
          />
          {onRefresh && (
            <IconButton
              onClick={onRefresh}
              disabled={isRefreshing}
              size="small"
              sx={{
                p: "8px",
                color: COLORS.textSecondary,
                transition: "transform 0.3s ease",
                ...(isRefreshing && {
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }),
              }}
            >
              <MdCached size={20} />
            </IconButton>
          )}
        </Paper>
      </Box>

      {/* Filter Chips Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          pb: "12px",
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Stack direction="row" spacing={1}>
          {FilteringOptions?.map((option) => {
            const isSelected = activeFilter === option.label;

            return (
              <Box position="relative" key={option.label}>
                <Chip
                  label={isSelected && count !== undefined && count !== null ? `${option.label} (${count})` : option.label}
                  clickable
                  onClick={() => onFilterChange(option)} // Pass the whole object back
                  sx={{
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: "0.85rem",
                    height: 32,
                    textTransform: "capitalize",
                    bgcolor: isSelected ? "#e8f0fe" : "#fff",
                    color: isSelected ? "#1967d2" : "#3c4043",
                    border: isSelected ? "1px solid #d2e3fc" : "1px solid #dadce0",
                    borderRadius: 15,
                    px: 1.2,
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: isSelected ? "#d2e3fc" : "#f1f3f4",
                    },
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </AppBar>
  );
};

export default GmailStyleHeader;