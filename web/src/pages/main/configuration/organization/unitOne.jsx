import React from "react";
import { useSelector } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";

import Main from "../../../../layout/main/main";
import Breadcrumb from "../../../../components/breadcrumb/breadcrumb";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import ActionIcon from "../../../../components/assetsComponent/actionIcon";
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

const UnitOneBody = () => {
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
      <DrawerMenu Element={<Box />} />
      <Grid item xs={12}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              height: "48px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "myCanvasBg",
              borderLeft: "1px solid rgba(0,0,0,0.3)",
              boxShadow: "inset 0px 8px 6px -9px",
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mx: 3,
              }}
            >
              <Grid item>
                <Box sx={{ color: "text.primary" }}>
                  <Breadcrumb />
                </Box>
              </Grid>
              <Grid item sx={{ borderLeft: "2px solid white", pl: 2 }}>
                <ActionIcon />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ height: "42px", backgroundColor: "myBackgroundColor" }}
          ></Grid>
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

const UnitOne = () => {
  return <Main Element={UnitOneBody()} delSearchBar={true} />;
};

export default UnitOne;
