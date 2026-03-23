import { Box, Typography, Chip, Stack } from "@mui/material";
import { Assets } from "../../../assets";

const Hello = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        width: "100%",
        position: "relative",
        textAlign: "center",
        px: 2,
        overflow: "hidden",
      }}
    >
      {/* TITLE */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "30vh",
          mt: 8,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.55rem",
            fontWeight: 800,
            color: "#111",
            letterSpacing: "-0.5px",
            fontFamily: "Kaushan Script, cursive",
          }}
        >
          Welcome to Optigo
        </Typography>

        {/* SUBTITLE */}
        <Typography
          sx={{
            mt: 1,
            fontSize: "0.95rem",
            color: "#555",
            maxWidth: 280,
            lineHeight: 1.4,
          }}
        >
          Your all-in-one support system for managing tickets, resolving issues, and helping your team respond faster.
        </Typography>

        {/* POWERED BY CHIP */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 2.5 }}>
          <Chip
            label="Powered by Optigo"
            sx={{
              bgcolor: "#eaf1ff",
              color: "#1f6bff",
              fontWeight: 600,
              px: 1.2,
              height: 32,
              borderRadius: 25,
              fontSize: "0.83rem",
              "& .MuiChip-label": {
                paddingLeft: "4px",
              },
            }}
          />
        </Stack>
      </Box>

      {/* BOTTOM FLOATING DECORATION IMAGE */}
      <Box
        sx={{
          bottom: "-90px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pb: 1,
          position: "absolute",
        }}
      >
        <Box component={"img"}
        //  src={Assets.illustrations.onlineWorld}
        src={Assets.Banner.banner5}
          width="400px" height="400px" sx={{ objectFit: "contain", opacity: 0.95 }} />
      </Box>
    </Box>
  );
};

export default Hello;
