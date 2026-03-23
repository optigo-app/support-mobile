import { createTheme } from "@mui/material/styles";
import { pickersDayClasses, yearCalendarClasses } from "@mui/x-date-pickers";
import '@fontsource/poppins'

const brand = {
  50: "hsl(210, 100%, 95%)",
  200: "hsl(210, 100%, 80%)",
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
  700: "hsl(210, 100%, 35%)",
};

const datePickerOverrides = {
  // all your date picker overrides ...
};

const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h4: { fontWeight: 600 },
  },
  components: {
    ...datePickerOverrides,
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
        containedPrimary: {
          backgroundColor: "#fdee13",
          color: "black",
          "&:hover": { backgroundColor: "#fdee13" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 0px 0px 0.5px rgba(90, 90, 90, 0.048)",
          border: "1px solid rgba(90, 90, 90, 0.055)",
        },
      },
    },
  },
});

export default theme;
