import { createContext, useContext, useEffect, useState } from "react";
import "./ThemeContext.css";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("app-theme");
    if (saved === "light" || saved === "dark") return saved;

    if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) {
      return "dark";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
