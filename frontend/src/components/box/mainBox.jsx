import React from "react";

import { Grid } from "@mui/material";

const MainBox = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        height: "100%",
        flexWrap: "nowrap",
      }}
      columnGap={0.5}
    >
      {children}
    </Grid>
  );
};

export default MainBox;
