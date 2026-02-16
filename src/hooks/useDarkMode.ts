import { useState, useEffect } from "react";

export default function useDarkMode() {
  // 1. Ambil initial state dari LocalStorage agar tidak reset saat pindah halaman
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
      localStorage.setItem("theme", "dark"); // Simpan ke storage
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Simpan ke storage
    }
  }, [dark]);

  const toggle = () => setDark(!dark);

  return { dark, toggle };
}