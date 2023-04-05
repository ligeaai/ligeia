import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Breadcrumb from "./breadcrumb";
const breadcrumbBox = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        position: "relative",
        height: "42px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "status.main",
        color: "text.primary",
        borderTopLeftRadius: "3px",
        borderTopRightRadius: "3px",
      }}
    >
      <Box sx={{ ml: 3 }}>
        <Breadcrumb />
      </Box>
    </Grid>
  );
};

export default breadcrumbBox;
