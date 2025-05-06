import MUIDataTable from "mui-datatables";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrencyRates } from "../hooks/useCurrencyRates";

const ExchangeRateLive = () => {
  const navigate = useNavigate();
  const { data: rates, isLoading, isError } = useCurrencyRates();

  const transformedData =
    rates &&
    Object.entries(rates).map(([currency, value]) => ({
      currency: currency,
      value: value,
    }));

  const columnData = [
    {
      name: "currency",
      label: "Currency",
      options: { filter: false, sort: false },
    },
    {
      name: "value",
      label: "Exchange Rate",
      options: { filter: false, sort: false },
    },
  ];

  const options = {
    print: false,
    download: false,
    filter: false,
    search: false,
    viewColumns: false,
    responsive: "standard",
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: isLoading
          ? "Loading..."
          : isError
          ? "Error loading rates"
          : "Sorry, no data available",
      },
    },
  };

  return (
      <MUIDataTable
        title={"Exchange Rate Live"}
        data={transformedData || []}
        columns={columnData}
        options={options}
      />
  );
};

export default ExchangeRateLive;
