import React from "react";
import { useSelector } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";

import Main from "../../../layout/main/main";
import Menu from "../../../components/navigationComp/treeView";
import { menu } from "./owerviewMenu";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";

import DrawerMenu from "../../../layout/main/asset/treeViewMenu";

const Canvas = () => {
  return (
    <Typography
      sx={{
        typography: "body2",
        color: "text.primary",
        textTransform: "capitalize",
      }}
    >
      canvas
    </Typography>
  );
};

const AssetOwerview = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "calc(100vh - 1px)" : "calc(100vh - 75px)",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <DrawerMenu Element={<Menu menu={menu} />} />
      <Grid
        item
        xs={12}
        sx={{
          m: 0.5,
          ml: 0,
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
              height: "48px",
              display: "flex",
              alignItems: "flex-end",
              backgroundColor: "myTreeViewBg",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            }}
          >
            <Box sx={{ color: "text.primary", ml: 3 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              height: isFullScreen ? "calc(100vh - 48px)" : "auto",
              backgroundColor: "myCanvasBg",
            }}
          >
            <Canvas />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Overview = () => {
  return <Main Element={AssetOwerview()} delSearchBar={true} />;
};

export default Overview;
