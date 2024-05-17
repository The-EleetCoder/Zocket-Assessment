import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [caption, setCaption] = useState(
    "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs"
  );
  const [cta, setCta] = useState("Shop Now");
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");

  const value = {
    caption,
    setCaption,
    backgroundColor,
    setBackgroundColor,
    cta,
    setCta,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
