import { createTheme } from '@mui/material/styles';

// Extend the default MUI palette to include 'highlight'
declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
    customColors: {
      cream: string;
    };
  }
  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
    customColors?: {
      cream?: string;
    };
  }
}

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
    highlight: {
      main: "#DAA520", // Original Gold
      light: "#FFD700", // Lighter Gold
    },
    // Define custom colors
    customColors: {
      cream: "#FDF3E7", // Cream color stored separately
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif", // DM Sans font for the whole app
  },
});

export default theme;
