import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Cards from "../../components/cardGenerator/cards";
const cards = [
  {
    cardTitle: "Asset",
    cardBody: "Asset overview",
    cardURL: "/overview",
  },
  {
    cardTitle: "Analytics",
    cardBody: "Assets analytics",
    cardURL: "/analytics",
  },
  {
    cardTitle: "Reporting",
    cardBody: "Assets reporting",
    cardURL: "/reporting",
  },
  {
    cardTitle: "Adminstration",
    cardBody: "Administration of the platform",
    cardURL: "/administration",
  },
  {
    cardTitle: "Configuration",
    cardBody: "Configuration of the platform",
    cardURL: "/configuration",
  },
];

const Main = () => {
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

export default Main;
