import React from "react";

import { Box } from "@mui/material";

import Cards from "../../components/cardGenerator/cards";
import Main from "../../layout/main/main";
const cards = [
  {
    cardTitle: "Asset",
    cardBody: "Asset overview",
    cardURL: "/overview",
    isActiveDrawer: 1,
  },
  {
    cardTitle: "Asset Status",
    cardBody: "Assets dashboards",
    cardURL: "/#",
    isActiveDrawer: 2,
  },
  {
    cardTitle: "Analytics",
    cardBody: "Assets analytics",
    cardURL: "/#",
    isActiveDrawer: 2,
  },
  {
    cardTitle: "Reporting",
    cardBody: "Assets reporting",
    cardURL: "/#",
    isActiveDrawer: 3,
  },
  {
    cardTitle: "Configuration",
    cardBody: "Configuration of the platform",
    cardURL: "/#",
    isActiveDrawer: 4,
  },
  {
    cardTitle: "Adminstration",
    cardBody: "Administration and configuration",
    cardURL: "/#",
    isActiveDrawer: 5,
  },
];
const main = () => {
  return (
    <Box sx={{ backgroundColor: "myCanvasBg", height: "100vh" }}>
      <Main Element={<Cards cards={cards} />} />
    </Box>
  );
};

export default main;
