import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  FormLabel,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import { labelStyle } from "./utils";

const AppSelectDropdown = ({
  label = "Topic",
  placeholder = "Select Topic",
  appList = [],
  selectedAppId = null,
  onSelect,
}) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedApp = useMemo(() => {
    if (selectedAppId === null || selectedAppId === undefined) return null;
    return appList?.find(
      (app) => String(app?.AppId) === String(selectedAppId)
    );
  }, [appList, selectedAppId]);

  const filteredApps = useMemo(() => {
    if (!appList || !Array.isArray(appList)) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return appList;
    return appList.filter((app) =>
      (app?.AppName || "").toLowerCase().includes(query)
    );
  }, [appList, searchQuery]);

  const handleOpen = () => {
    setSearchQuery("");
    setOpenPicker(true);
  };

  const handleClose = () => {
    setOpenPicker(false);
    setSearchQuery("");
  };

  const handleChoose = (appId) => {
    if (onSelect) {
      onSelect(appId);
    }
    handleClose();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(null);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <FormLabel sx={labelStyle}>{label}</FormLabel>

      {/* Field Trigger Box */}
      <Box
        onClick={handleOpen}
        sx={{
          mt: 0.8,
          border: "1px solid #E5E7EB",
          borderRadius: "14px",
          px: 1.8,
          py: 1.2,
          bgcolor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "all 0.18s ease",
          "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
          "&:active": { bgcolor: "#f1f5f9" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "9px",
              bgcolor: selectedApp ? "rgba(74, 102, 255, 0.1)" : "#f1f5f9",
              color: selectedApp ? "#4A66FF" : "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AppsRoundedIcon sx={{ fontSize: 18 }} />
          </Box>

          <Typography
            sx={{
              fontSize: "0.92rem",
              fontWeight: selectedApp ? 600 : 400,
              color: selectedApp ? "#1e293b" : "#94a3b8",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedApp ? selectedApp.AppName : placeholder}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0, ml: 1 }}>
          {selectedApp && (
            <IconButton
              size="small"
              onClick={handleClear}
              aria-label="Clear selected topic"
              sx={{
                p: 0.4,
                color: "#94a3b8",
                "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.08)" },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
          <KeyboardArrowDownRoundedIcon
            sx={{
              fontSize: 22,
              color: "#64748b",
              transition: "transform 0.2s ease",
              transform: openPicker ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Box>
      </Box>

      {/* Mobile-Friendly Selection Bottom Sheet */}
      <Drawer
        anchor="bottom"
        open={openPicker}
        onClose={handleClose}
        sx={{
          zIndex: 10000000000, // Above the parent Add Call drawer
        }}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "75dvh",
            maxWidth: { xs: "100%", sm: 460 },
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: "#ffffff",
            boxShadow: "0 -10px 40px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* Pull Handle */}
        <Box
          sx={{
            width: 36,
            height: 4,
            borderRadius: 2,
            bgcolor: "#cbd5e1",
            mx: "auto",
            mt: 1.2,
            mb: 0.8,
          }}
        />

        {/* Sheet Header */}
        <Box
          sx={{
            px: 2.2,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
              Select Topic
            </Typography>
            {appList?.length > 0 && (
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  bgcolor: "#f1f5f9",
                  color: "#64748b",
                  px: 0.8,
                  py: 0.2,
                  borderRadius: "10px",
                }}
              >
                {appList.length}
              </Typography>
            )}
          </Box>
          <IconButton onClick={handleClose} size="small" sx={{ color: "#64748b" }}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Box sx={{ px: 2, pb: 1.2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#f1f5f9",
              borderRadius: "12px",
              px: 1.5,
              py: 0.8,
            }}
          >
            <SearchRoundedIcon sx={{ fontSize: 19, color: "#64748b" }} />
            <InputBase
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic..."
              sx={{
                fontSize: { xs: "16px", sm: "0.9rem" },
                color: "#1e293b",
                "& input::placeholder": { color: "#94a3b8", opacity: 1 },
              }}
            />
            {searchQuery && (
              <IconButton size="small" onClick={() => setSearchQuery("")} sx={{ p: 0.2, color: "#94a3b8" }}>
                <CloseRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#f1f5f9" }} />

        {/* Scrollable Apps List */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            px: 1.2,
            py: 1,
          }}
        >
          <List disablePadding>
            {/* None / Clear Option */}
            <ListItemButton
              onClick={() => handleChoose(null)}
              selected={selectedAppId === null || selectedAppId === undefined}
              sx={{
                borderRadius: "12px",
                mb: 0.6,
                py: 1.2,
                px: 1.5,
                "&.Mui-selected": {
                  bgcolor: "rgba(74, 102, 255, 0.08)",
                  "&:hover": { bgcolor: "rgba(74, 102, 255, 0.12)" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: "#f1f5f9",
                    color: "#94a3b8",
                  }}
                >
                  <BlockRoundedIcon sx={{ fontSize: 16 }} />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="None (No Topic)"
                primaryTypographyProps={{
                  fontSize: "0.88rem",
                  color: "#64748b",
                  fontWeight: selectedAppId === null ? 600 : 400,
                }}
              />
              {(selectedAppId === null || selectedAppId === undefined) && (
                <CheckCircleRoundedIcon sx={{ color: "#4A66FF", fontSize: 20 }} />
              )}
            </ListItemButton>

            {filteredApps.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                  No topic found for "{searchQuery}"
                </Typography>
              </Box>
            ) : (
              filteredApps.map((app) => {
                const isSelected = String(app?.AppId) === String(selectedAppId);
                const initial = (app?.AppName || "A").charAt(0).toUpperCase();
                return (
                  <ListItemButton
                    key={app?.AppId}
                    onClick={() => handleChoose(app?.AppId)}
                    selected={isSelected}
                    sx={{
                      borderRadius: "12px",
                      mb: 0.6,
                      py: 1.2,
                      px: 1.5,
                      "&.Mui-selected": {
                        bgcolor: "rgba(74, 102, 255, 0.08)",
                        "&:hover": { bgcolor: "rgba(74, 102, 255, 0.12)" },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 38 }}>
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          bgcolor: isSelected ? "#4A66FF" : "#f1f5f9",
                          color: isSelected ? "#ffffff" : "#475569",
                          borderRadius: "8px",
                        }}
                      >
                        {initial}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={app?.AppName}
                      primaryTypographyProps={{
                        fontSize: "0.92rem",
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? "#4A66FF" : "#1e293b",
                      }}
                    />
                    {isSelected && (
                      <CheckCircleRoundedIcon sx={{ color: "#4A66FF", fontSize: 20 }} />
                    )}
                  </ListItemButton>
                );
              })
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AppSelectDropdown;
