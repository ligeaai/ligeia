import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  CollapsableMenu,
} from "../../../components";

import DrawerMenu from "../../../layout/main/asset/collapseTreeMenu";

import Tabs from "./tabs";
import { loadCollapseMenu } from "../../../services/actions/collapseMenu/collapseMenu";
import ItemLinkService from "../../../services/api/itemLink";

const Overview = () => {
  const dispatch = useDispatch();
  const isActiveTabs = useSelector((state) => state.tapsOverview.isActive);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  React.useEffect(() => {
    dispatch(loadCollapseMenu(ItemLinkService.hierarchy));
  }, []);
  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item>
        <DrawerMenu Element={CollapsableMenu} path="overview" />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid container>
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
          <ItemSperatorLineXL />
          {isActiveTabs ? <Tabs /> : <Box sx={{ backgroundColor: "red" }} />}
          {/*<Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <OverviewEditor />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Overview);
