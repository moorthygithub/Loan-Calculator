// Assuming you have something like this in your `useCurrencyRates.js` file

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL =
  "https://v6.exchangerate-api.com/v6/8cdca3e93a0e1dcba0bec6ba/latest/INR";

const fetchCurrencyRates = async () => {
  const response = await axios.get(API_URL);
  return response.data.conversion_rates;
};

export const useCurrencyRates = () => {
  return useQuery({
    queryKey: ["currencyRates"],
    queryFn: fetchCurrencyRates,
  });
};
