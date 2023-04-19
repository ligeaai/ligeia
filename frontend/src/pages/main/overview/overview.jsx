import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import {
  ItemSperatorLineXL,
  CollapsableMenu,
  Breadcrumb,
  MainBox,
} from "../../../components";

import DrawerMenu from "../../../layout/main/asset/collapseTreeMenu";

import Tabs from "./tabs";
import { loadCollapseMenu } from "../../../services/actions/collapseMenu/collapseMenu";
import ItemLinkService from "../../../services/api/itemLink";
import { selectDrawerItem } from "../../../services/actions/drawerMenu/drawerMenu";
const Overview = () => {
  const dispatch = useDispatch();
  const isActiveTabs = useSelector((state) => state.tapsOverview.isActive);
  React.useEffect(() => {
    document.title = "Ligeia.ai | Overview";
    selectDrawerItem("Overview");
    dispatch(loadCollapseMenu(ItemLinkService.hierarchy));
  }, []);
  return (
    <MainBox>
      <DrawerMenu Element={CollapsableMenu} path="overview" />

      <Grid
        item
        xs={12}
        sx={{
          overflow: "hidden",
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid container>
          <Breadcrumb />
          <ItemSperatorLineXL />
          {isActiveTabs ? <Tabs /> : <Box sx={{ backgroundColor: "red" }} />}
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default React.memo(Overview);
