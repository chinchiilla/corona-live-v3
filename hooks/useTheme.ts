import { useContext } from "react";

import { ThemeContext } from "styled-components";
import { theme, ThemeType } from "@styles/themes";

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  const _theme = (attr: ThemeType) => {
    return theme(attr)({ theme: themeContext });
  };
  return _theme;
};
