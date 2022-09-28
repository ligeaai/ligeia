import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";

import {
  AdminstrationIcon,
  // AnalyticsIcon,
  HomeIcon,
  OverviewIcon,
  ReportingIcon,
} from "../../assets/Images/drawer";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ConstructionIcon from "@mui/icons-material/Construction";
const Main = (props) => {
  const drawer = useSelector((state) => state.drawer);
  const { Element } = props;
  const items = [
    {
      img: <HomeOutlinedIcon />,
      text: "Home",
      url: "/",
    },
    {
      img: <DisplaySettingsIcon />,
      text: "Overview",
      url: "/#",
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
  const MyCanvas = styled(Grid)(({ theme }) => {
    return {
      backgroundColor: theme.palette.myCanvasBg,
      minHeight: "calc(100vh - 75px)",
      height: "auto",
    };
  });
  return (
    <Box>
      <Header />
      <Grid container>
        <Grid
          item
          sx={{
            typography: {
              xs: {
                display: `${drawer.width}` === "88px" ? "none" : "block",
              },
              sm: { display: "inline-block" },
            },
          }}
        >
          <Drawer items={items} />
        </Grid>
        <MyCanvas
          item
          sx={{
            typography: {
              xs: { marginLeft: "0px" },
              sm: {
                marginLeft: `${drawer.width}`,
                width: `calc(100vw - ${drawer.width})`,
              },
            },
          }}
        >
          {Element}
        </MyCanvas>
      </Grid>
    </Box>
  );
};

export default Main;
