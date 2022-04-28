import React from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { themes } from "@styles";

export interface ThemeContextProps {
    theme: string;
    setTheme: () => void;
}

export const ThemeContext = React.createContext<Partial<ThemeContextProps>>({});

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useLocalStorage("theme", "light");
    if (!theme) return <></>;
    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            <StyledThemeProvider theme={themes[theme]}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
