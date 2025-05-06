import { Container } from "@mui/material";
import React from "react";
import {
  matchRoutes,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import About from "./components/About";
import DisabledRightClick from "./components/DisableRightClick";
import ErrorPage from "./components/ErrorPage";
import ExchangeRateLive from "./components/ExchangeRateLive";
import LoanForm from "./components/LoanForm";
import Navbar from "./components/Navbar";

const routes = [
  { path: "/" },
  { path: "/exchange_rates_live" },
  { path: "/about" },
];

const AppContent = () => {
  const location = useLocation();

  const matched = matchRoutes(routes, location);

  const shouldShowNavbar = !!matched;

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <DisabledRightClick />
      <Container>
        <Routes>
          <Route path="/" element={<LoanForm />} />
          <Route path="/exchange_rates_live" element={<ExchangeRateLive />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
