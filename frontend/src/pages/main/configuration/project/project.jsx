import React from "react";

import { Grid } from "@mui/material";

import {
  BreadcrumbBox,
  ItemSperatorLineXL,
  MainBox,
} from "../../../../components";
import ProjectEditor from "./projectEditor";
const Project = () => {
  document.title = `Ligeia.ai | Project`;
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
          <Grid item xs={12} sx={{ mt: 1, ml: 1, mr: 2 }}>
            <ProjectEditor />
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Project;
