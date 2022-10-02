import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ConstructionIcon from "@mui/icons-material/Construction";

const Main = (props) => {
  const drawerWidth = useSelector((state) => state.drawer.width);
  const { Element } = props;
  const navItems = [
    {
      img: <HomeOutlinedIcon />,
      text: "Home",
      url: "/",
    },
    {
      img: <DisplaySettingsIcon />,
      text: "Overview",
      url: "/overview",
    },
    {
      img: <AccountTreeIcon />,
      text: "Analytics",
      url: "/#",
    },
    {
      img: <AnalyticsIcon />,
      text: "Reporting",
      url: "/#",
    },
    {
      img: <ConstructionIcon />,
      text: "Administration",
      url: "/#",
    },
  ];

  return (
    <Box>
      <Header />
      <Grid container sx={{ flexWrap: "nowrap" }}>
        <Grid
          item
          sx={{
            backgroundColor: "myBackgroundColor",
            zIndex: 2,
            typography: {
              xs: {
                position: "absolute",
                display: `${drawerWidth}` === "88px" ? "none" : "inline-block",
              },
              sm: { display: "inline-block", position: "relative" },
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
  );
};

export default Main;
