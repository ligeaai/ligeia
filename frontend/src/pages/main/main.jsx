import React from "react";
import { Box } from "@mui/material";

import Cards from "../../components/cardGenerator/cards";
import { selectDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
const cards = [
  {
    cardTitle: "Asset",
    cardURL: "/overview",
  },
  {
    cardTitle: "Reporting",
    cardURL: "/reporting_desinger/reporting",
  },
  {
    cardTitle: "Adminstration",
    cardURL: "/administration",
  },
  {
    cardTitle: "Tools",
    cardURL: "/tools",
  },
  {
    cardTitle: "Configuration",
    cardURL: "/configuration",
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
