import React from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import theme from "./theme";

const AppTheme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        "::selection": {
          background: "rgba(102,126,234,0.4)",
          color: "#fff",
        },
        "*": {
          WebkitTapHighlightColor: "rgba(102,126,234,0.2)",
        },
      }}
    />
    {children}
  </ThemeProvider>
);

export default AppTheme;
