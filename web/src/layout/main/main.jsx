import React from "react";

import { Box } from "@mui/system";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";

import {
  GroupZero,
  GroupOne,
  GroupTwo,
  GroupThree,
  GroupFive,
} from "../../assets/Images/drawer";

const main = () => {
  const items = [
    {
      img: <GroupFive />,
      text: "Home",
      url: "/none",
    },
    {
      img: <GroupZero />,
      text: "Overview",
      url: "/none",
    },
    {
      img: <GroupOne />,
      text: "Analyrics",
      url: "/none",
    },
    {
      img: <GroupTwo />,
      text: "Reporting",
      url: "/none",
    },
    {
      img: <GroupThree />,
      text: "Administration",
      url: "/none",
    },
  ];
  return (
    <Box>
      <Header />
      <Drawer items={items} />
    </Box>
  );
};

export default main;
