import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Header from "../header";

const App = () => {
  const [toggleDark, settoggleDark] = useState(false);

  const theme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          enableColorOnDark: false,
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar color="default">App bar background should be Red!</AppBar> */}
      <Header toggleDark={toggleDark} settoggleDark={settoggleDark} />
    </ThemeProvider>
  );
};

export default App;
