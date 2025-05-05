import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useLoan } from "../context/LoanContext";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

const LoanCalculator = () => {
  const {
    principal,
    setPrincipal,
    rate,
    setRate,
    term,
    setTerm,
    currency,
    setCurrency,
  } = useLoan();
  const { data: rates } = useCurrencyRates();

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  // EMI Calculation Formula
  const calculateEMI = (P, r, n) => {
    const monthlyRate = r / 100 / 12;
    const emi =
      (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);
    return emi;
  };

  const generateAmortizationSchedule = (P, r, n) => {
    const schedule = [];
    let balance = P;
    const totalEMI = calculateEMI(P, r, n);
    console.log(totalEMI);
    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * (r / 100 / 12);
      const principalPayment = totalEMI - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        principalPaid: principalPayment.toFixed(2),
        interestPaid: interestPayment.toFixed(2),
        remainingBalance: balance.toFixed(2),
      });
    }

    return schedule;
  };

  const handleSubmit = () => {
    const loanAmountValue = principal;
    const interestRateValue = rate;
    const loanTermValue = term * 12;

    const emi = calculateEMI(loanAmountValue, interestRateValue, loanTermValue);
    const amortization = generateAmortizationSchedule(
      loanAmountValue,
      interestRateValue,
      loanTermValue
    );

    setMonthlyEMI(emi.toFixed(2));
    setAmortizationSchedule(amortization);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>
      {/* Loan Inputs */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Principal (INR)"
            fullWidth
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Interest Rate (%)"
            fullWidth
            type="number"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Loan Term (Years)"
            fullWidth
            type="number"
            value={term}
            onChange={(e) => setTerm(+e.target.value)}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="start" marginTop={2}>
        <Button onClick={handleSubmit} variant="contained">
          Calculate
        </Button>
      </Box>

      {/* EMI Display */}
      <h2>
        Monthly EMI:{" "}
        {currency === "USD" ? `$${monthlyEMI}` : `${currency} ${monthlyEMI}`}
      </h2>

      {/* Currency Selection */}
      <h3>Convert To Currency</h3>
      <Grid item xs={12}>
        <TextField
          select
          label="Currency"
          fullWidth
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {rates &&
            Object.keys(rates).map((cur) => (
              <MenuItem key={cur} value={cur}>
                {cur}
              </MenuItem>
            ))}
        </TextField>
      </Grid>

      <h3>Amortization Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {amortizationSchedule.map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>
              <td>
                {currency === "USD"
                  ? `${row.principalPaid} USD`
                  : `${row.principalPaid} ${currency}`}
              </td>
              <td>
                {currency === "USD"
                  ? `${row.interestPaid} USD`
                  : `${row.interestPaid} ${currency}`}
              </td>
              <td>
                {currency === "USD"
                  ? `${row.remainingBalance} USD`
                  : `${row.remainingBalance} ${currency}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanCalculator;
