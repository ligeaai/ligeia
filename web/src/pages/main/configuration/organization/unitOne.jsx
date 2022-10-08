import React from "react";
import { useSelector } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";

import Main from "../../../../layout/main/main";
import Breadcrumb from "../../../../components/breadcrumb/breadcrumb";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import ActionIcon from "../../../../components/assetsComponent/actionIcon";
import TimeRangePicker from "../../../../components/assetsComponent/timeRangePicker";

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
            sx={{ backgroundColor: "myBackgroundColor", pl: 4 }}
          >
            <TimeRangePicker />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              height: isFullScreen ? "calc(100vh - 48px)" : "auto",
              backgroundColor: "myCanvasBg",
            }}
          >
            <Grid container>
              <Grid
                item
                sx={{
                  backgroundColor: "#313131",
                  writingMode: "tb-rl",
                  WebkitTransform: "rotate(180deg)",
                  MozTransform: "rotate(180deg)",
                  OTransform: "rotate(180deg)",
                  msTransform: "rotate(180deg)",
                }}
              >
                <Grid container spacing={1}>
                  <Grid
                    item
                    sx={{
                      border: "1px solid black",
                      fontSize: "14px",
                      color: "text.primary",
                    }}
                  >
                    Links
                  </Grid>
                  <Grid
                    item
                    sx={{
                      border: "1px solid black",
                      fontSize: "14px",
                      color: "text.primary",
                    }}
                  >
                    Properties
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Canvas />
              </Grid>
            </Grid>
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
