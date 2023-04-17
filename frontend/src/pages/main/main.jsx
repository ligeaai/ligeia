import React from "react";
import { Box } from "@mui/material";

import Cards from "../../components/cardGenerator/cards";
import { selectDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
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
    cardURL: "/reporting_desinger/reporting",
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
  document.title = "Ligeia.ai | Home";
  selectDrawerItem("Home");
  return (
    <Box className="home-main">
      <Cards cards={cards} />
    </Box>
  );
};

export default Main;
