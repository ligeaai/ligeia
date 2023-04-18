import React from "react";

import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  MainBox,
} from "../../../../components";
import ProjectEditor from "./projectEditor";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
const Project = () => {
  document.title = `Ligeia.ai | Project`;
  selectDrawerItem("Project");
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
          <Breadcrumb />
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
