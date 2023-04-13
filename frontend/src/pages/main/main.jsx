import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Cards from "../../components/cardGenerator/cards";
const cards = [
  {
    cardTitle: "Asset",
    cardBody: "Asset overview",
    cardURL: "/overview",
    shortName: "Overview",
  },
  {
    cardTitle: "Reporting",
    cardBody: "Assets reporting",
    cardURL: "/reporting",
    shortName: "Reporting",
  },
  {
    cardTitle: "Adminstration",
    cardBody: "Administration of the platform",
    cardURL: "/administration",
    shortName: "Adminstration",
  },
  {
    cardTitle: "Tools",
    cardBody: "Tools",
    cardURL: "/tools",
    shortName: "Tools",
  },
  {
    cardTitle: "Configuration",
    cardBody: "Configuration of the platform",
    cardURL: "/configuration",
    shortName: "Configuration",
  },
];

const Main = () => {
  document.title = "Liegia.ai | Home";
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
