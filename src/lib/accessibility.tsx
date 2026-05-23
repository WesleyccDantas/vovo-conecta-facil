import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = {
  fontScale: number;
  setFontScale: (n: number) => void;
  highContrast: boolean;
  toggleContrast: () => void;
};

const A11yContext = createContext<Ctx | null>(null);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("hc", highContrast);
  }, [highContrast]);

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
