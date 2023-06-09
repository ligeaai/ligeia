import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import Cards from "../../../components/cardGenerator/cards";
import { LoadingComponent } from "../../../components";
import { setSelectedDrawerItem } from "../../../services/actions/drawerMenu/drawerMenu";
import { selectDrawerItem } from "../../../services/actions/drawerMenu/drawerMenu";
const Main = ({ way }) => {
  document.title = `Ligeia.ai | ${way}`;
  selectDrawerItem(way);
  const dispatch = useDispatch();
  const drawerData = useSelector((state) => state.drawerMenu.data);
  React.useEffect(() => {
    if (drawerData) {
      const drawerDataConfiguration = drawerData[way];
      dispatch(setSelectedDrawerItem(drawerDataConfiguration));
    }
  }, [drawerData]);
  if (drawerData) {
    const drawerDataConfiguration = drawerData[way];
    var cards = [];
    if (drawerDataConfiguration)
      Object.keys(drawerDataConfiguration.Items).map((e) => {
        var url = drawerDataConfiguration.Items[e].SHORT_LABEL.toLowerCase();
        url = url.replace(/ /g, "_");
        cards.push({
          cardTitle: drawerDataConfiguration.Items[e].SHORT_LABEL,
          cardURL: `/${way.toLowerCase()}/${url}`,
        });
      });

    return (
      <Box className="home-main">
        <Cards cards={cards} />
      </Box>
    );
  }
  return <LoadingComponent></LoadingComponent>;
};

export default Main;
