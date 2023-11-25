"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    function toggleTheme() {
      if (theme === "light") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        setTheme("light");
      }
    }
    toggleTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("UseTheme must be used inside theme provider!");

  return context;
};
