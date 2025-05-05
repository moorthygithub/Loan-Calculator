import { Card, CardContent, Typography } from "@mui/material";
import { useLoan } from "../context/LoanContext";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

export default function Results() {
  const { principal, rate, term, currency } = useLoan();
  const { data: rates } = useCurrencyRates();

  if (!principal || !rate || !term || !rates) return null;

  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const convertedEMI = emi * rates[currency];
  const convertedTotal = totalPayment * rates[currency];

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">Results</Typography>
        <Typography>
          Monthly EMI: ₹{emi.toFixed(2)} / {currency} {convertedEMI.toFixed(2)}
        </Typography>
        <Typography>
          Total Payment: ₹{totalPayment.toFixed(2)} / {currency}{" "}
          {convertedTotal.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}
