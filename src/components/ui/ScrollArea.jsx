import React from "react";
import { Box } from "@mui/material";

const hideScrollbar = {
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",

  /* Chrome / Safari / Edge */
  "&::-webkit-scrollbar": {
    display: "none",
  },

  /* Firefox */
  scrollbarWidth: "none",

  /* IE / old Edge */
  msOverflowStyle: "none",
};


const ScrollArea = ({ children, sx }) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        pb: { xs: 9.5, sm: 10 },
        WebkitOverflowScrolling: "touch",
        bgcolor: "#fff",
        // Custom Scrollbar
        ...hideScrollbar,
      }}
    >
      <Box sx={{ px: { xs: 1.5, sm: 3, md: 4 }, pt: { xs: 2.5, sm: 3 } }}>{children}</Box>
    </Box>
  );
};

export default ScrollArea;


export const EmailScrollArea = React.forwardRef(function EmailScrollArea(
  { children, sx },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        flex: 1,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        bgcolor: "#fff",
        ...hideScrollbar,
        ...sx,
        pb: 20,
        position: 'relative',
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
});



export const HomeScrollArea = React.forwardRef(function EmailScrollArea(
  { children, sx, bgcolor },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        flex: 1,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        bgcolor: bgcolor || "#fff",
        ...hideScrollbar,
        ...sx,
        position: 'relative'
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
});
