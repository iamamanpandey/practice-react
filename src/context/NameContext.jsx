import React, { createContext } from "react";

export const MyContext = createContext();

export default function NameProvider({ children }) {
  const name = "Aman Pandey";

  return <MyContext.Provider value={{ name }}>{children}</MyContext.Provider>;
}
