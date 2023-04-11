import React from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

const MainBox = ({ children }) => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
        backgroundColor: "background.secondary"
      }}
    >
      {children}
    </Grid>
  );
};

export default MainBox;
