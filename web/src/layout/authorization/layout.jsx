import React from "react";
import { Grid } from "@mui/material";
const layout = (props) => {
  const { Element } = props;
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "calc(100vh - 300px)", sm: "calc(100vh - 250px)" },
        minHeight: "500px",
      }}
    >
      <Grid
        item
        sx={{
          backgroundColor: "primary.dark",
          p: 3,
          pb: 6.5,
          boxShadow: "0px 20px 27px rgba(0, 0, 0, 0.05)",
          borderRadius: "12px",
        }}
      >
        {Element}
      </Grid>
    </Grid>
  );
};

export default layout;
