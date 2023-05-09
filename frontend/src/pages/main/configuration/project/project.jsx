import React from "react";

import { Grid } from "@mui/material";

import { Breadcrumb, ItemSperatorLineXL } from "../../../../components";
import ProjectEditor from "./projectEditor";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/page/project.scss";

const Project = () => {
  document.title = `Ligeia.ai | Project`;
  selectDrawerItem("Project");
  return (
    <Grid container className="project-container">
      <Breadcrumb />
      <ItemSperatorLineXL />
      <Grid item xs={12} className="project-container__body">
        <ProjectEditor />
      </Grid>
    </Grid>
  );
};

export default Project;
