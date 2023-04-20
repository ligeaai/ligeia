import React from "react";
import { Box } from "@mui/material";

import Cards from "../../components/cardGenerator/cards";
import { selectDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
import { useDispatch, useSelector } from "react-redux";
import { isRead } from "../../services/utils/permissions";
const Main = () => {
  document.title = "Ligeia.ai | Home";
  selectDrawerItem("Home");
  const dispatch = useDispatch();
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    const res = [
      {
        cardTitle: "Overview",
        cardURL: "/overview",
        permission: true,
      },
      {
        cardTitle: "Reporting",
        cardURL: "/reporting",
        permission: dispatch(isRead("REPORT")),
      },
      {
        cardTitle: "Adminstration",
        cardURL: "/administration",
        permission: true,
      },
      {
        cardTitle: "Tools",
        cardURL: "/tools",
        permission:
          dispatch(isRead("PROJECT")) ||
          dispatch(isRead("RESOURCE_LIST")) ||
          dispatch(isRead("CODE_LIST")) ||
          dispatch(isRead("TYPES")) ||
          dispatch(isRead("WORKFLWOS")),
      },
      {
        cardTitle: "Configuration",
        cardURL: "/configuration",
        permission: dispatch(isRead("CONFIG")),
      },
    ];
    res.map((e) => {
      console.log(e.permission);
      if (e.permission)
        setCards((prev) => {
          return [...prev, e];
        });
    });
    return () => setCards([]);
  }, []);

  return (
    <Box className="home-main">
      <Cards cards={cards} />
    </Box>
  );
};

export default Main;
