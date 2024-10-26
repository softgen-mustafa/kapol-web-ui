import { createTheme } from "@mui/material/styles";

// Extend the default MUI palette to include 'highlight'
declare module "@mui/material/styles" {
  interface Palette {
    highlight: Palette["primary"];
    customColors: {
      cream: string;
      parchment: string;
      parchmentLight1: string; // Slightly lighter parchment
      parchmentLight2: string; // Softer, aged-paper look
      parchmentLight3: string; // Very light parchment
      parchmentNearWhite: string; // Almost white
      richInk: string; // Dark ink-like color for primary text
      sepia: string; // Sepia tone for an antique look
      warmGray: string; //
      subtleGold: string; //
      deepSapphire: string; //
      imperialPurple: string; //
      rubyRed: string; //
      antiqueGold: string; //
      softIvory: string; //
      creamLight: string; //
      dustyRose: string; //
      goldenrod: string; //
      burgundy: string; //
      slateBlue: string; //
    };
  }
  interface PaletteOptions {
    highlight?: PaletteOptions["primary"];
    customColors?: {
      cream?: string;
      parchment: string; // Aged paper look
      parchmentLight1: string; // Slightly lighter parchment
      parchmentLight2: string; // Softer, aged-paper look
      parchmentLight3: string; // Very light parchment
      parchmentNearWhite: string; // Almost white
      richInk: string; // Dark ink-like color for primary text
      sepia: string; // Sepia tone for an antique look
      warmGray: string; //
      subtleGold: string; //
      deepSapphire: string; //
      imperialPurple: string; //
      rubyRed: string; //
      antiqueGold: string; //
      softIvory: string; //
      creamLight: string; //
      dustyRose: string; //
      goldenrod: string; //
      burgundy: string; //
      slateBlue: string; //
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
      parchment: "#EDE0CF", // Parchment color resembling aged paper
      parchmentLight1: "#F3E8DB", // Slightly lighter parchment
      parchmentLight2: "#F7EFE5", // Softer, aged-paper look
      parchmentLight3: "#FBF5ED", // Very light parchment
      parchmentNearWhite: "#FDFBF7", // Almost white
      richInk: "#2F241B", // Dark ink-like color for primary text
      sepia: "#7A5230", // Sepia tone for an antique look
      warmGray: "#8E7C6D", // Warm gray for muted, secondary text
      subtleGold: "#C2A77D", // Subtle light gold for highlights
      deepSapphire: "#0F3057", // Dark sapphire for primary text
      imperialPurple: "#4B0082", // Dark, regal purple for headings
      rubyRed: "#8B0000", // Deep ruby red for highlights
      // antiqueGold: "#B8860B", // Antique gold for accent text
      softIvory: "#FAF3E0",
      dustyRose: "#D19A8A",
      burgundy: "#9B2D2F",
      goldenrod: "#DAA520",
      slateBlue: "#6A8EBD",
      creamLight: "#F8F8F8",
      antiqueGold: "#C6A95C",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif", // DM Sans font for the whole app
  },
});

export default theme;
