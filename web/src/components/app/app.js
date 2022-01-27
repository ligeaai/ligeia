import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IconButton, CssBaseline } from "@mui/material";

import { Routes, Route } from "react-router-dom";


import ColorModeContext from "../context";
import Header from "../header";
import { LoginPage, HomePage } from "../pages";

const App = () => {
  const [mode, setMode] = React.useState("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  console.log("Toggle color mode :" + mode);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
        
        {/* <Header /> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
