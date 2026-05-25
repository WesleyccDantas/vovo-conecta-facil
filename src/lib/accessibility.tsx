import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = {
  fontScale: number;
  setFontScale: (n: number) => void;
  highContrast: boolean;
  toggleContrast: () => void;
};

const A11yContext = createContext<Ctx | null>(null);

const FS_KEY = "conecta-vovo:fontScale";
const HC_KEY = "conecta-vovo:highContrast";

export function A11yProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScaleState] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const fs = localStorage.getItem(FS_KEY);
      if (fs) setFontScaleState(Math.min(1.5, Math.max(0.9, parseFloat(fs))));
      const hc = localStorage.getItem(HC_KEY);
      if (hc === "1") setHighContrast(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
    try {
      localStorage.setItem(FS_KEY, String(fontScale));
    } catch {
      /* ignore */
    }
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("hc", highContrast);
    try {
      localStorage.setItem(HC_KEY, highContrast ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [highContrast]);

  const setFontScale = (n: number) => setFontScaleState(n);

  return (
    <A11yContext.Provider
      value={{
        fontScale,
        setFontScale,
        highContrast,
        toggleContrast: () => setHighContrast((v) => !v),
      }}
    >
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used inside A11yProvider");
  return ctx;
}
