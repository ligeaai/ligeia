import React from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { Box, Grid, Typography, Tab, Tabs } from "@mui/material";

import Main from "../../../../layout/main/main";
import Breadcrumb from "../../../../components/breadcrumb/breadcrumb";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import ActionIcon from "../../../../components/navigationComp/actionMenu";
import TimeRangePicker from "../../../../components/navigationComp/timeRangePicker";
import Properties from "../../../../components/navigationComp/propLinkTabs";
import { ItemSperatorLineXL } from "../../../../components/nestedMenu/nestedItems";
import DateBreak from "../../../../components/navigationComp/dateBreak";

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
      <DrawerMenu
        Element={
          <Box
            sx={{
              height: isFullScreen
                ? "calc(100vh - 85px)"
                : "calc(100vh - 85px - 75px)",
            }}
          />
        }
      />
      <Grid
        item
        xs={12}
        sx={{
          m: 0.5,
          boxShadow: 3,
          borderRadius: "5px",
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
              alignItems: "center",
              backgroundColor: "myTreeViewBg",
              color: "text.primary",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mx: 3,
                color: "text.primary",
              }}
            >
              <Grid item>
                <Box>
                  <Breadcrumb />
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  borderLeft: "2px solid",
                  borderColor: "text.primary",
                  pl: 2,
                }}
              >
                <ActionIcon />
              </Grid>
            </Grid>
          </Grid>
          <ItemSperatorLineXL />
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "myBackgroundColor",
              pl: 4,
            }}
          >
            <DateBreak />
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <Properties />
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
