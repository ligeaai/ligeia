import React from "react";

import Grid from "@mui/material/Grid";

import {
  ItemSperatorLineXL,
  PropLinkTabs,
  ComponentError,
  Breadcrumb,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import Body from "./body";
import TreeMenu from "./treeMenu";
import ActionMenu from "./actionMenus";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/layouts/template.scss";
import "../../../../assets/styles/page/item.scss";
const Main = () => {
  document.title = `Ligeia.ai | Workflows`;
  selectDrawerItem("Workflows");
  return (
    <React.Fragment>
      <DrawerMenu Element={<TreeMenu />} path="item" />

      <Grid
        item
        xs={12}
        className="template-container__body  item-container__body"
      >
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid container className="item-container__body__action-box">
          <ActionMenu />
        </Grid>

        <ItemSperatorLineXL />
        <Grid item xs={12} className="item-container__body__property-box">
          <ComponentError errMsg="Error">
            <PropLinkTabs MyProperties={<Body />} />
          </ComponentError>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Main;
