import React from "react";

import Cards from "../../components/cardGenerator/cards";
import Main from "../../layout/main/main";
const cards = [
  {
    cardTitle: "Asset",
    cardBody: "Asset overview",
    cardURL: "/#",
  },
  {
    cardTitle: "Asset Status",
    cardBody: "Assets dashboards",
    cardURL: "/#",
  },
  {
    cardTitle: "Analytics",
    cardBody: "Assets analytics",
    cardURL: "/#",
  },
  {
    cardTitle: "Reporting",
    cardBody: "Assets reporting",
    cardURL: "/#",
  },
  {
    cardTitle: "Adminstration",
    cardBody: "Administration and configuration",
    cardURL: "/#",
  },
];
const main = () => {
  return <Main Element={<Cards cards={cards} />} />;
};

export default main;
