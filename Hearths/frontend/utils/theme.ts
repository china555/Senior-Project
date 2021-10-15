import { extendTheme } from "@chakra-ui/react";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  PrimaryColor: {
    900: "#225378",
    800: "#4D7C97",
    bg: "#CBD8DB",
  },
  SecondaryColor: "#FF7A00",
};

const fonts = {
  body: "Roboto, sans-serif",
};

const styles = {
  global: {
    body: {
      bg: "white",
      color: "#2d3748",
    },
    a: {
      textDecoration: "none",
      color: "#2d3748",
    },
  },
};
export const theme = extendTheme({ colors, fonts, styles });
