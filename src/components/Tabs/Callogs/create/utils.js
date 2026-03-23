import React, { memo } from "react";
import { Box,  InputBase, FormLabel, Button,  } from "@mui/material";

// --- Constants & Styles (Defined outside to prevent recreation) ---
const colors = {
  bg: "#F9FAFB",
  textMain: "#111827",
  textSub: "#6B7280",
  border: "#E5E7EB",
  primary: "#3B82F6",
  primaryLight: "#EFF6FF",
  black: "#111827",
};

const inputContainerStyle = {
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  padding: "7px 16px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
  transition: "border-color 0.2s",
  "&:hover": { borderColor: "#d1d5db" },
  "&:focus-within": {
    borderColor: colors.primary,
    boxShadow: `0 0 0 2px ${colors.primaryLight}`,
  },
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: colors.textSub,
  marginBottom: "4px",
  display: "block",
};

// --- Pure Utility Function (No React Logic) ---
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Handle 0 as 12

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours.toString().padStart(2, "0")} : ${minutes} ${ampm}`,
  };
};

// --- Memoized Child Components (Prevents unneeded re-renders) ---

const CustomField = memo(({ label, placeholder, multiline, icon, value, readOnly, name, onChange, disable }) => (
  <Box sx={{ mb: 3 }}>
    <FormLabel sx={labelStyle}>{label}</FormLabel>
    <Box
      sx={{
        ...inputContainerStyle,
        alignItems: multiline ? "flex-start" : "center",
        backgroundColor: readOnly ? "#F3F4F6" : "#FFFFFF",
      }}
    >
      <InputBase
        fullWidth
        name={name}
        placeholder={placeholder}
        multiline={multiline}
        minRows={multiline ? 5 : 1}
        value={value}
        readOnly={readOnly}
        disabled={disable}
        onChange={onChange}
        sx={{
          fontSize: "15px",
          fontWeight: 500,
          color: colors.textMain,
          "& input::placeholder, & textarea::placeholder": { opacity: 0.6 },
          cursor: readOnly ? "default" : "text",
        }}
      />
      {icon && <Box sx={{ color: colors.textSub, ml: 1, display: "flex", alignItems: "center" }}>{icon}</Box>}
    </Box>
  </Box>
));

const AppNameButton = memo(({ label, selected, onClick }) => (
  <Button
    onClick={onClick}
    variant="contained"
    disableElevation
    sx={{
      borderRadius: "18px",
      textTransform: "none",
      fontWeight: 500,
      fontSize: "14px",
      height: 33,
      px: 1.6,
      minWidth: "auto",
      whiteSpace: "nowrap",
      bgcolor: selected ? "transparent" : "#fff",
      background: selected ? "linear-gradient(135deg, #3a3dff 0%, #5f71ff 40%, #2b1aff 100%)" : "transparent",
      color: selected ? "#fff" : colors.textSub,
      border: selected ? "none" : `1px solid ${colors.border}`,
      boxShadow: selected ? "0 3px 10px rgba(58,61,255,0.25)" : "none",
      "&:hover": {
        background: selected ? "linear-gradient(135deg, #3438f8 0%, #5466ff 40%, #2518e8 100%)" : "#f3f4f6",
        border: selected ? "none" : `1px solid ${colors.border}`,
      },
    }}
  >
    {label}
  </Button>
));

export { AppNameButton, CustomField, colors, getCurrentDateTime, inputContainerStyle, labelStyle };
