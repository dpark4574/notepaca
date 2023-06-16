import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import Layout from "./components/Layout";
import Landing from "./pages/landing";
import theme from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <div>
      {/* <Layout>
        <div>hi</div>
      </Layout> */}
      <Landing />
    </div>
  </ChakraProvider>
);
