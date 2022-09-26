import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";

import {
  AdminstrationIcon,
  AnalyticsIcon,
  HomeIcon,
  OverviewIcon,
  ReportingIcon,
} from "../../assets/Images/drawer";

const Main = (props) => {
  const drawer = useSelector((state) => state.drawer);
  const { Element } = props;
  const items = [
    {
      img: <HomeIcon />,
      text: "Home",
      url: "/home",
    },
    {
      img: <OverviewIcon />,
      text: "Overview",
      url: "/none",
    },
    {
      img: <AnalyticsIcon />,
      text: "Analyrics",
      url: "/none",
    },
    {
      img: <ReportingIcon />,
      text: "Reporting",
      url: "/none",
    },
    {
      img: <AdminstrationIcon />,
      text: "Administration",
      url: "/none",
    },
  ];
  return (
    <Box>
      <Header />
      <Grid container>
        <Grid
          item
          sx={{
            typography: {
              xs: {
                display: `${drawer.width}` === "74px" ? "none" : "block",
              },
              sm: { display: "inline-block" },
            },
          }}
        >
          <Drawer items={items} />
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: "#F0F2F5",
            minHeight: "calc(100vh - 75px)",
            height: "auto",
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
