import React from "react";

import ItemLinkService from "../../../services/api/itemLink";

const Treeview = () => {
  React.useEffect(() => {
    async function myFunc() {
      let res = await ItemLinkService.hierarchy();
      console.log(res);
    }

    myFunc();
  });
  return <div>treeview</div>;
};

export default Treeview;
