import React from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { themes } from "@styles";
import { DomesticProvider } from "./DomesticContext";
import { WorldProvider } from "./WorldContext";
import { ThemeProvider } from "./ThemeContext";

export const Provider: React.FC = ({ children }) => {
    return (
        <ThemeProvider>
            <DomesticProvider>
                <WorldProvider>{children}</WorldProvider>
            </DomesticProvider>
        </ThemeProvider>
    );
};
