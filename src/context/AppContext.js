import { createContext, useState } from "react";

// context creation
export const AppContext = createContext();

// create Provider
export function AppContextProvider({ children }) {
    
  // object which contains all the required data
  const value = {};

  // returning the provider
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
