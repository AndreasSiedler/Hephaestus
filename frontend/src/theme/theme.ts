import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { breakpoints } from "./foundations/breakpoints";
import { fonts } from "./foundations/fonts";

const colors = {
  brand: {
    50: "#fae5ff",
    100: "#e7b7fe",
    200: "#d487f8",
    300: "#c257f4",
    400: "#b029f0",
    500: "#960fd6",
    600: "#750aa8",
    700: "#550679",
    800: "#33024a",
    900: "#14001d",
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
          h: 20,
          fontSize: "lg",
          px: "10",
          borderRadius: "20",
          borderWidth: "0px",
        },
      },
    },
  },
  Textarea: {
    sizes: {
      lg: {
        h: 200,
        fontSize: "lg",
        py: 8,
        px: "10",
        borderRadius: "20",
        borderWidth: "0px",
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
