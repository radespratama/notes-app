import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

import AppContextProvider from "./context/AppContext.jsx";
import theme from "./utils/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <App />

        <Toaster position="top-right" />
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
