import React from "react";
import { useSelector } from "react-redux";
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
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <Box
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        boxShadow: 3,
        borderRadius: "3px",
      }}
    >
      <Cards cards={cards} />
    </Box>
  );
};

const main = () => {
  try {
    return <Main Element={MainRender()} />;
  } catch {
    throw new Error("asdsad");
  }
};

export default main;
