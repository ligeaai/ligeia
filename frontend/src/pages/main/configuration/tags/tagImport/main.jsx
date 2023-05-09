import React from "react";
import { Grid } from "@mui/material";

import { Breadcrumb, ItemSperatorLineXL } from "../../../../../components";

import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";
import Body from "./body";
import ActionMenu from "./actionMenu";
import "../../../../../assets/styles/page/configuration/tagImport.scss";
import "../../../../../assets/styles/layouts/template.scss";
const Main = () => {
  document.title = `Ligeia.ai | Tag Import`;
  selectDrawerItem("Tag Import");
  return (
    <Grid
      container
      columnGap={0.5}
      className="template-container tag-import-container"
    >
      <Grid item xs={12} className="template-container__body">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid
          item
          className="template-container__body__action-menu-box tag-import-container__action-box"
        >
          <ActionMenu />
        </Grid>
        <ItemSperatorLineXL />
        <Grid
          item
          xs={12}
          className="template-container__body__property-box tag-import-container__property-box"
        >
          <Body />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
