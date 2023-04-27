import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import {
  ItemSperatorLineXL,
  CollapsableMenu,
  Breadcrumb,
  ComponentError,
} from "../../../components";

import DrawerMenu from "../../../layout/main/asset/treeViewMenu";

import Tabs from "./tabs";
import { loadCollapseMenu } from "../../../services/actions/collapseMenu/collapseMenu";
import ItemLinkService from "../../../services/api/itemLink";
import { selectDrawerItem } from "../../../services/actions/drawerMenu/drawerMenu";
import "../../../assets/styles/page/overview/main.scss";
const Overview = () => {
  const dispatch = useDispatch();
  const isActiveTabs = useSelector((state) => state.tapsOverview.isActive);
  React.useEffect(() => {
    document.title = "Ligeia.ai | Overview";
    selectDrawerItem("Overview");
    dispatch(loadCollapseMenu(ItemLinkService.hierarchy));
  }, []);
  return (
    <React.Fragment>
      <DrawerMenu Element={<CollapsableMenu />} path="overview" />
      <Grid Grid item xs={12} className="overview-container">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <ComponentError errMsg="Error">
          {isActiveTabs ? <Tabs /> : <Box />}
        </ComponentError>
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(Overview);
