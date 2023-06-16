// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  shadows: {
    pink: "1px 6px 1px 1px rgba(237, 100, 166, 0.2)",
  },
});

export default theme;
