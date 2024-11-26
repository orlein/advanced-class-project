import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  systemTheme: Theme; // 추가된 부분
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  systemTheme: "light", // 기본값 설정
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
                                children,
                                defaultTheme = "system",
                                storageKey = "vite-ui-theme",
                                ...props
                              }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [systemTheme, setSystemTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;

    // 시스템 테마 감지 함수
    const updateSystemTheme = () => {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newSystemTheme = isDarkMode ? "dark" : "light";
      setSystemTheme(newSystemTheme);

      // 시스템 테마가 변경될 때 root 클래스도 업데이트
      if (theme === "system") {
        root.classList.remove("light", "dark");
        root.classList.add(newSystemTheme);
      }
    };

    // 초기 시스템 테마 설정 및 이벤트 리스너 추가
    updateSystemTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateSystemTheme);

    // cleanup 함수에서 이벤트 리스너 제거
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateSystemTheme);
    };
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, systemTheme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = {
    theme,
    systemTheme, // 추가된 부분
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
