import React from "react";
import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";
const main = () => {
  document.title = `Ligeia.ai | Tag Import`;
  selectDrawerItem("Tag Import");
  return <div>main</div>;
};

export default main;
