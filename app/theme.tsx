"use client";

import "@fontsource/poppins";
import { Theme, colors, createTheme } from "@mui/material";

const getColorKey = (hex: string) => {
  switch (hex) {
    case "#eb3d63":
      return "red";
  }
};
const themeWheelByHex = {
  red: ["red"],
};

const appThemes: any = [
  {
    name: "Yellow",
    code: "yellow",
    colors: [
      "#995c00", // Darker Shade 4
      "#e68a00", // Darker Shade 1
      "#ffce80", // Lighter Tint 2
      "#1d6bff", // Complementary Color
      "#cc7a00", // Darker Shade 2
      "#ff761d", // Analogous Color 2
      "#ff9d1d", // Monochromatic 1
      "#b0b0b0", // Neutral Gray
      "#ffddaa", // Lighter Tint 3
      "#ff7e1d", // Analogous Color 3
      "#ffab1d", // Primary Color
      // "#995c00", // Darker Shade 4
      "#ffbf57", // Triadic Color 1
      "#1d9eff", // Split Complementary 2
      "#ffbf4d", // Lighter Tint 1
      "#1dff57", // Split Complementary 1
      // "#e68a00", // Darker Shade 1
      "#ff851d", // Monochromatic 2
      "#ff6f1d", // Analogous Color 1
      "#b36d00", // Darker Shade 3
      "#ffeecc", // Lighter Tint 4
      "#57ffbf", // Triadic Color 2
    ],
    theme: createTheme({
      typography: {
        fontFamily: "Poppins, sans-serif",
      },
      palette: {
        primary: {
          main: "#ffab1d",
          // light: "#f2815e",
          contrastText: "#000000de",
        },
        secondary: {
          main: "#FFFFFF",
          contrastText: "#1EAFE5",
        },
      },
    }),
  },
];

const getTheme = (type: Theme) => {
  return type;
};

export { getTheme, appThemes, themeWheelByHex, getColorKey };
