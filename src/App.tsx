import * as React from "react";
import { ChakraProvider, Switch } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import Layout from "./components/Layout";
import Landing from "./pages/landing";
import theme from "./theme";
import { PostHogProvider } from "posthog-js/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

export const App = () => (
  <ChakraProvider theme={theme}>
    <PostHogProvider
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </PostHogProvider>
  </ChakraProvider>
);
