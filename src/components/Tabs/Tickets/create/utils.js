import { Box, InputBase, FormLabel,  Button } from "@mui/material";

// --- 1. STYLES & CONSTANTS ---
const colors = {
  bg: "#F9FAFB",
  textMain: "#111827",
  textSub: "#6B7280",
  border: "#E5E7EB",
  primary: "#7c3aed", // Purple theme
  primaryLight: "#f5f3ff",
  danger: "#EF4444",
};

// Input Style
const inputContainerStyle = {
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  padding: "10px 16px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
  transition: "all 0.2s",
  "&:hover": { borderColor: "#d1d5db" },
  "&:focus-within": {
    borderColor: colors.primary,
    boxShadow: `0 0 0 4px ${colors.primaryLight}`,
  },
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: colors.textSub,
  marginBottom: "4px",
  display: "block",
};

// --- 2. SUB-COMPONENTS ---

// Text Field Wrapper
const CustomInput = ({ label, placeholder, multiline, value, onChange, autoFocus }) => (
  <Box sx={{ mb: 3 }}>
    <FormLabel sx={labelStyle}>
      {label} <span style={{ color: colors.danger }}>*</span>
    </FormLabel>
    <Box
      sx={{
        ...inputContainerStyle,
        alignItems: multiline ? "flex-start" : "center",
        minHeight: multiline ? 120 : "auto",
      }}
    >
      <InputBase
        fullWidth
        autoFocus={autoFocus}
        placeholder={placeholder}
        multiline={multiline}
        minRows={multiline ? 4 : 1}
        value={value}
        onChange={onChange}
        sx={{
          fontSize: "15px",
          fontWeight: 500,
          color: colors.textMain,
          p: 0,
          "& input::placeholder, & textarea::placeholder": { opacity: 0.5 },
        }}
      />
    </Box>
  </Box>
);

// Category Selection Button (Pill Style)
const CategoryChip = ({ label, selected, onClick }) => (
  <Button
    onClick={onClick}
    disableElevation
    disableRipple
    sx={{
      borderRadius: "18px",
      textTransform: "none",
      fontWeight: 500,
      fontSize: "14px",
      height: 33,
      px: 1.6,
      minWidth: "auto",
      whiteSpace: "nowrap",

      fontWeight: selected ? 600 : 500,
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",

      // Selected State - Gradient Purple
      background: selected ? "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)" : "#fff",
      color: selected ? "#fff" : colors.textSub,
      border: selected ? "1px solid transparent" : `1px solid ${colors.border}`,
      boxShadow: selected ? "0 4px 12px rgba(124, 58, 237, 0.25)" : "none",

      "&:hover": {
        background: selected ? "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)" : "#f9fafb",
        transform: "translateY(-1px)",
        borderColor: selected ? "transparent" : "#d1d5db",
      },
    }}
  >
    {label}
  </Button>
);



export {
    CategoryChip ,
    CustomInput ,
    colors ,
inputContainerStyle ,
labelStyle
}