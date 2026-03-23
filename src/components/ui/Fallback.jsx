import React from "react";
import { Box, Typography, Stack, Paper, Button } from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const EmptyLogsState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:'100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          border:'none',
          outline:'none',
          bgcolor:'transparent',
          boxShadow:'none'
        }}
      >
        <Stack spacing={2} alignItems="center">
          <HistoryRoundedIcon sx={{ fontSize: 48, opacity: 0.4 }} />

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            No activity yet
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 300 }}>
            Log entries will appear here once there’s something to show. Try refreshing or
            perform an action.
          </Typography>

        </Stack>
      </Paper>
    </Box>
  );
};

export default EmptyLogsState;
