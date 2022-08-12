import React from "react";

import Cards from "../../components/cardGenerator/Cards";

const servicePage = () => {
  const cards = [
    {
      cardTitle: "Учетные записи",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
    {
      cardTitle: "Оборудование",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
    {
      cardTitle: "Скважины",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
    {
      cardTitle: "События",
      cardBody: "Краткое описание назначения данного раздела",
      cardURL: "/monitoring",
    },
  ];
  return <Cards props={cards} />;
};

export default servicePage;
