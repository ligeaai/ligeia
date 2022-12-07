import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  CollapsableMenu,
} from "../../../components";

import DrawerMenu from "../../../layout/main/asset/treeViewMenu";
import TreeView from "./treeview";

import Tabs from "./tabs";
import { loadCollapseMenu } from "../../../services/actions/collapseMenu/collapseMenu";
import ItemLinkService from "../../../services/api/itemLink";

const Overview = () => {
  const dispatch = useDispatch();

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
      <Grid item sx={{ minHeight: "500px", boxShadow: 3, mr: 0.5 }}>
        <DrawerMenu Element={<CollapsableMenu />} />
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
              backgroundColor: "myTreeViewBg",
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
          <Tabs />
          {/*<Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <OverviewEditor />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Overview;
