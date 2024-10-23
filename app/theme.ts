import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B4226", // Dark brown color
      light: "#8C6142", // Lighter shade of dark brown
      dark: "#4D2F1A", // Darker shade of dark brown
      contrastText: "#FFF8F0", // Text color on primary buttons, etc.
    },
    secondary: {
      main: "#FFF8F0", // Light cream color
      light: "#FFFFFF", // Even lighter cream (white)
      dark: "#EDE1D5", // Darker cream shade
      contrastText: "#6B4226", // Text color on secondary buttons, etc.
    },
    // accent: {
    //   main: "#D29F68", // Accent color, a soft warm shade
    //   light: "#E1B88A", // Lighter accent
    //   dark: "#B87F4B", // Darker accent
    //   contrastText: "#FFF8F0",
    // },
    error: {
      main: "#D32F2F", // Standard error color
      light: "#EF5350", // Lighter error
      dark: "#C62828", // Darker error
      contrastText: "#FFF", // Text on error backgrounds
    },
    warning: {
      main: "#FFA726", // Warning orange
      light: "#FFB74D", // Light warning orange
      dark: "#F57C00", // Dark warning orange
      contrastText: "#FFF8F0",
    },
    info: {
      main: "#0288D1", // Info blue
      light: "#03A9F4", // Light info blue
      dark: "#01579B", // Dark info blue
      contrastText: "#FFF8F0",
    },
    success: {
      main: "#388E3C", // Success green
      light: "#66BB6A", // Light success green
      dark: "#2E7D32", // Dark success green
      contrastText: "#FFF8F0",
    },
    background: {
      default: "#FFF8F0", // Light background color
      paper: "#EDE1D5", // Slightly darker background for elements like cards
    },
    text: {
      primary: "#6B4226", // Main text color
      secondary: "#8C6142", // Slightly lighter text color
      disabled: "#B87F4B", // Disabled text color (brownish accent)
      // hint: "#D29F68", // Hint text color
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif", // DM Sans font for the whole app
  },
});

export default theme;
