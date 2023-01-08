import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { breakpoints } from "./foundations/breakpoints";
import { fonts } from "./foundations/fonts";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

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
  initialColorMode: "dark",
};

// Extend the theme
const theme = extendTheme({ fonts, breakpoints, components, config });

export default theme;
