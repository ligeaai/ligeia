import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import { HomePage, AboutPage, LoginPage } from "../pages";
import { CustomThemeProvider } from "../theme-control";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  const [myTheme, setMyTheme] = useState();
  const [theme, setTheme] = useState(createTheme({}));

  useEffect(() => {
    console.log("create a theme in app with", myTheme);
    setTheme(createTheme(myTheme));
  }, [myTheme]);

  return (
    <CustomThemeProvider>
      <CssBaseline />
      {/* <AppBar color="default">App bar background should be Red!</AppBar> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
