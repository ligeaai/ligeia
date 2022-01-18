import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Switch from "@mui/material/Switch";

import Header from "../header";

const App = () => {
  const [toggleDark, settoggleDark] = useState(false);
  const myTheme = createTheme({
    // Theme settings
    palette: {
      type: toggleDark ? "dark" : "light",
    },
  });

  const handleModeChange = () => {
    settoggleDark(!toggleDark);
  };

  return (
    <div>
      <ThemeProvider theme={myTheme}>
        {/* <Switch
          checked={toggleDark}
          onChange={handleModeChange}
          name="toggleDark"
          color="default"
        /> */}
        <Header />
      </ThemeProvider>
    </div>
  );
};

export default App;
