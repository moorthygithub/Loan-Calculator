import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoanProvider } from "./context/LoanContext.jsx";
import { Container, CssBaseline } from "@mui/material";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
      <LoanProvider>
        <CssBaseline />
        {/* <Container> */}
        <StrictMode>
          <App />
        </StrictMode>
        {/* </Container> */}
      </LoanProvider>
    </ThemeContextProvider>
  </QueryClientProvider>
);
