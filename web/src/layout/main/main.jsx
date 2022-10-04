import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Grid } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ConstructionIcon from "@mui/icons-material/Construction";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";
import { setIsFullScreen } from "../../services/reducers/fullScreenReducer";

const Main = (props) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const { Element, delSearchBar } = props;
  const navItems = [
    {
      Icon: HomeOutlinedIcon,
      title: "Home",
      breadcrumbItems: ["Home"],
      url: "/",
    },
    {
      Icon: DisplaySettingsIcon,
      title: "Overview",
      breadcrumbItems: ["Overview"],
      url: "/overview",
    },
    {
      Icon: AccountTreeIcon,
      title: "Analytics",
      breadcrumbItems: ["Analytics"],
      url: "/#",
    },
    {
      Icon: AnalyticsIcon,
      title: "Reporting",
      breadcrumbItems: ["Reporting"],
      url: "/#",
    },
    {
      Icon: ConstructionIcon,
      title: "Administration",
      breadcrumbItems: ["Administration"],
      url: "/#",
    },
    {
      Icon: AnalyticsIcon,
      title: "Configuration",
      breadcrumbItems: ["Configuration"],
      url: "/#",
      items: [
        {
          Icon: AnalyticsIcon,
          title: "Configuration",
          breadcrumbItems: ["Configuration"],
          url: "/#",
          items: [
            {
              Icon: AnalyticsIcon,
              title: "Unit 1",
              breadcrumbItems: ["Configuration", "Organization", "Unit 1"],
              url: "/#",
            },
            {
              Icon: AnalyticsIcon,
              title: "Unit 2",
              breadcrumbItems: ["Configuration", "Organization", "Unit 2"],
              url: "/#",
            },
            {
              Icon: AnalyticsIcon,
              title: "unit 3",
              breadcrumbItems: ["Configuration", "Organization", "Unit 3"],
              url: "/#",
            },
          ],
        },
      ],
    },
  ];

  return isFullScreen ? (
    <React.Fragment>
      {Element}
      <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 2 }}>
        <Button
          onClick={() => {
            dispatch(setIsFullScreen(false));
          }}
        >
          <FullscreenExitIcon />
        </Button>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Box>
        <Header delSearchBar={delSearchBar} />
        <Grid container sx={{ flexWrap: "nowrap" }}>
          <Grid
            item
            sx={{
              backgroundColor: "myBackgroundColor",
              zIndex: 2,
              typography: {
                xs: {
                  position: "absolute",
                },
                sm: { position: "relative" },
              },
            }}
          >
            <Drawer navItems={navItems} />
          </Grid>
          <Grid
            item
            sx={{
              backgroundColor: "myCanvasBg",
              minHeight: "calc(100vh - 75px)",
              height: "auto",
              width: "100%",
            }}
          >
            {Element}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 2 }}>
        <Button
          onClick={() => {
            dispatch(setIsFullScreen(true));
          }}
        >
          <FullscreenIcon />
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Main;
