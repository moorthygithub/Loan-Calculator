import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanForm from "./components/LoanForm";
import Results from "./components/Results";
// import CurrencySelector from "./components/CurrencySelector";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<LoanForm />} />
          <Route path="/results" element={<Results />} />
          {/* <Route path="/exchange-rates" element={<CurrencySelector />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<ErrorPage />} /> {/* catch-all route */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
