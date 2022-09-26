import React from "react";

import { Box } from "@mui/system";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";

import {
  AdminstrationIcon,
  AnalyticsIcon,
  HomeIcon,
  OverviewIcon,
  ReportingIcon,
} from "../../assets/Images/drawer";

const main = () => {
  const items = [
    {
      img: <HomeIcon />,
      text: "Home",
      url: "/none",
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
      <Drawer items={items} />
    </Box>
  );
};

export default main;
