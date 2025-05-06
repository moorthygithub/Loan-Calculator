import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";

const About = () => {
  const theme = useTheme();

  const Section = ({ title, children }) => (
    <Box my={3}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );

  return (
    <Box maxWidth="md">
      <Typography variant="h4" gutterBottom>
        About This App
      </Typography>
      <Divider />

      <Typography variant="body1" color="text.secondary" mt={2}>
        This Loan Calculator App is a modern, single-page web application built
        using React JS and Material UI. It allows users to calculate loan EMIs
        (Equated Monthly Installments), view a detailed amortization schedule,
        and see real-time currency conversions using live exchange rates.
      </Typography>

      <Section title="🔧 Features">
        - Loan EMI calculation using financial formulas
        <br />
        - Monthly amortization schedule
        <br />
        - Live currency conversion
        <br />
        - Exchange rate table with 160+ currencies
        <br />
        - Dark/Light mode toggle
        <br />- Responsive layout with collapsible mobile navigation
      </Section>

      <Section title="📦 Technologies Used">
        - React (Hooks, Routing, Context API)
        <br />
        - Material UI
        <br />
        - Axios
        <br />- Exchange Rate API
      </Section>

      <Section title="🔣 EMI Formula Used">
        EMI = [P × R × (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> – 1]
        <br />
        <br />
        Where:
        <br />
        P = Principal loan amount
        <br />
        R = Monthly interest rate (annual rate / 12 / 100)
        <br />N = Loan duration in months
      </Section>

      <Section title="🌍 Currency Conversion API">
        This app integrates with the ExchangeRate-API for live currency rates.
        <br />
        <br />
        API Example:
        <br />
        <a
          href="https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD"
          target="_blank"
          rel="noreferrer"
        >
          https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
        </a>
        <br />
        Replace `YOUR_API_KEY` with your actual key.
      </Section>

      <Section title="🎯 Purpose of This App">
        This project evaluates your React skills: working with hooks, API
        integration, building responsive UI with Material UI, creating reusable
        components, and managing global state.
      </Section>

      <Typography
        variant="body2"
        mt={5}
        color="text.disabled"
        textAlign="center"
      >
        ✨ Ensure your API key is valid for currency features to function
        correctly.
      </Typography>
    </Box>
  );
};

export default About;
