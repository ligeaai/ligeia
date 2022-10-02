import React from "react";

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
    cardTitle: "Adminstration",
    cardBody: "Administration and configuration",
    cardURL: "/#",
    isActiveDrawer: 4,
  },
];
const main = () => {
  return <Main Element={<Cards cards={cards} />} />;
};

export default main;
