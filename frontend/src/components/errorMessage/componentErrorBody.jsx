import React from "react";

import { Grid } from "@mui/material";

const componentErrorBody = (props) => {
  const { icon, text } = props;
  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: "center", color: "primary.main" }}>
        {icon}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center", color: "primary.main" }}>
        {text}
      </Grid>
    </Grid>
  );
};

export default componentErrorBody;
