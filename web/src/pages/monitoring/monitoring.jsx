import React from "react";

import Cards from "../../components/cardGenerator/Cards";

const monitoring = () => {
  const cards = [
    {
      cardTitle: "Статус оборудования",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
    {
      cardTitle: "Производительность",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
    {
      cardTitle: "Мнемосхема",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
  ];
  return <Cards props={cards} />;
};

export default monitoring;
