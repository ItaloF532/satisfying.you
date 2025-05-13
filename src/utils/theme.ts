import { DefaultTheme } from "react-native-paper";

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const appTheme = {
  ...DefaultTheme,
  fontConfig: {
    fontFamily: "AveriaLibre",
  },
  colors: {
    ...DefaultTheme.colors,
    primary: "#37474F",
    accent: "#4CAF50",
    background: "#f5f5f5",
    surface: "#ffffff",
    error: "#B00020",
    text: "#000000",
  },
};
