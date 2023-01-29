import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { breakpoints } from "./foundations/breakpoints";
import { fonts } from "./foundations/fonts";

const colors = {
  brand: {
    100: "#B73CF1",
  },
};

const components = {
  Steps,

  Button: {
    sizes: {
      xl: {
        h: "56px",
        fontSize: "lg",
        px: "32px",
      },
    },
  },
  Input: {
    sizes: {
      lg: {
        field: {
          h: "60px",
          fontSize: "lg",
        },
      },
    },
  },
};

// Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
};

// Extend the theme
const theme = extendTheme({ fonts, colors, breakpoints, components, config });

export default theme;
