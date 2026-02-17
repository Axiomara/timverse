import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark"); 
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light"); 
    }
  }, [dark]);

  const toggle = () => setDark(!dark);

  return { dark, toggle };
}