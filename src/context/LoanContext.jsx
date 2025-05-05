import { createContext, useContext, useState } from "react";

// Creating a context to share loan data across components
const LoanContext = createContext();

export const useLoan = () => useContext(LoanContext);

export const LoanProvider = ({ children }) => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [term, setTerm] = useState(5);
  const [currency, setCurrency] = useState("USD");

  return (
    <LoanContext.Provider
      value={{
        principal,
        setPrincipal,
        rate,
        setRate,
        term,
        setTerm,
        currency,
        setCurrency,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
