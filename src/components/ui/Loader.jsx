import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: {
        xs: "calc(100dvh - 96px)",
        sm: "calc(100svh - 96px)", 
      },
      gap: 1.2,
      color: "rgba(0,0,0,0.6)",
      animation: "fadeIn 0.3s ease",
      "@keyframes fadeIn": {
        from: { opacity: 0, transform: "translateY(4px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
    }}
  >
    <CircularProgress
      size={26}
      thickness={5}
      sx={{
        color: "transparent",
        "& .MuiCircularProgress-circle": {
          stroke: "url(#gradient)",
          strokeLinecap: "round",
        },
      }}
    />
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  </Box>
);

export default Loader;
