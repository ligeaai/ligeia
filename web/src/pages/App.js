import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import AppRouter from "../routers/appRouter";

import myTheme from "../themes/composeStyle";
import Loading from "../components/HOC/loading";

const App = () => {

  return (
    <ThemeProvider theme={myTheme()}>
      <Loading Element={<AppRouter />} />
    </ThemeProvider>
  );
};

export default App;
