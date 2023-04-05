import React from "react";

import { Grid } from "@mui/material";

import {
  BreadcrumbBox,
  ItemSperatorLineXL,
  MainBox,
} from "../../../../components";
import DiagnosticEditor from "./diagnosticEditor";

const Main = () => {
  return (
    <MainBox>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid container>
          <BreadcrumbBox />
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <DiagnosticEditor />
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Main;
