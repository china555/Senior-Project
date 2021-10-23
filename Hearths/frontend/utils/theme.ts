import { extendTheme } from "@chakra-ui/react";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  PrimaryColor: {
    900: "#225378",
    800: "#4D7C97",
    bg: "#F2F5F6",
  },
  SecondaryColor: "#FF7A00",
  ThirdColor: "#3387B6",
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
  },
};

const components = {
  Link: {
    baseStyle: {
      textDecoration: "none",
      _hover: {
        textDecoration: "none",
      },
    },
  },
};

export const theme = extendTheme({ colors, fonts, styles, components });
