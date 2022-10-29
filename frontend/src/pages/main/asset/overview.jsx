import React from "react";
import { useSelector } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";

import { TreeView, Breadcrumb } from "../../../components";
import { menu } from "./owerviewMenu";

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

const Overview = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

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
        <DrawerMenu Element={<TreeView menu={menu} />} />
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

export default Overview;
