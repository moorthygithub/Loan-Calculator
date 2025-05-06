import {
  Box,
  Button,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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
  const { data: rates, isLoading, isError, error } = useCurrencyRates();

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

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
  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  if (isError) {
    return <div>Error fetching currency rates: {error.message}</div>;
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>
      {/* Loan Inputs */}
      <Grid container spacing={2}>
        <Grid span={12} breakpoints={{ sm: 4 }}>
          <TextField
            label="Principal (INR)"
            fullWidth
            type="text"
            value={principal}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setPrincipal(value);
              }
            }}
          />
        </Grid>
        <Grid span={12} breakpoints={{ sm: 4 }}>
          <TextField
            label="Interest Rate (%)"
            fullWidth
            type="text"
            value={rate}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setRate(value);
              }
            }}
          />
        </Grid>
        <Grid span={12} breakpoints={{ sm: 4 }}>
          <TextField
            label="Loan Term (Years)"
            fullWidth
            type="text"
            value={term}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setTerm(value);
              }
            }}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="start" marginTop={2}>
        <Button onClick={handleSubmit} variant="contained">
          Calculate
        </Button>
      </Box>
      {amortizationSchedule.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ my: 3 }}>
            Monthly EMI: ${monthlyEMI}
          </Typography>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="flex-start">
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
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ p: 1.5 }}
                onClick={() => setAmortizationSchedule([])}
              >
                RESET TABLE
              </Button>
            </Box>
          </Grid>

          <TableContainer component={Paper} sx={{ mt: 4, maxHeight: "400px" }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Amortization Schedule ({currency})
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amortizationSchedule.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>
                      {row.principalPaid} {currency}
                    </TableCell>
                    <TableCell>
                      {row.interestPaid} {currency}
                    </TableCell>
                    <TableCell>
                      {row.remainingBalance} {currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default LoanCalculator;
