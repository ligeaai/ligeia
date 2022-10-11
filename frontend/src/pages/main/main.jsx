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
    cardURL: "/analytics",
    isActiveDrawer: 2,
  },
  {
    cardTitle: "Reporting",
    cardBody: "Assets reporting",
    cardURL: "/reporting",
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
    cardURL: "/administration",
    isActiveDrawer: 5,
  },
];

const MainRender = () => {
  return (
    <Box
      sx={{
        m: 0.5,
        boxShadow: 3,
        borderRadius: "5px",
        height: "calc(100% - 8px)",
      }}
    >
      <Cards cards={cards} />
    </Box>
  );
};

const main = () => {
  return (
    <Box
      sx={{
        backgroundColor: "myCanvasBg",
        minHeight: "100vh",
        height: "auto",
      }}
    >
      <Main Element={MainRender()} />
    </Box>
  );
};

export default main;
