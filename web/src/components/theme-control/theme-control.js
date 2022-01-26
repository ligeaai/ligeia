import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core";

const ThemeContext = React.createContext({});

export const CustomThemeContext = () => {
  return React.useContext(ThemeContext);
};

export const CustomThemeProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );
  console.log("Theme Provider: " + isDarkMode);
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};
