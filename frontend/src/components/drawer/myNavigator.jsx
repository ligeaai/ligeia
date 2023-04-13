import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
import history from "../../routers/history";
const MyNavigator = ({ way }) => {
  document.title = `Liegia.ai | ${way}`;
  const dispatch = useDispatch();
  const { myKey } = useParams();
  const drawerMenu = useSelector((state) => state.drawerMenu.data);
  var url = "/";

  if (drawerMenu) {
    const configurationItems = drawerMenu[way].Items;
    Object.keys(configurationItems).map((e) => {
      var myKeyValidator = configurationItems[e].SHORT_LABEL.toLowerCase();
      myKeyValidator = myKeyValidator.replace(/ /g, "_");
      if (myKey === myKeyValidator) {
        var tempUrl =
          configurationItems[e].Items[
            Object.keys(configurationItems[e].Items)[0]
          ].SHORT_LABEL.toLowerCase();
        tempUrl = tempUrl.replace(/ /g, "_");
        url = `${window.location.pathname}/${tempUrl}`;
        dispatch(
          setSelectedDrawerItem(
            configurationItems[e].Items[
              Object.keys(configurationItems[e].Items)[0]
            ]
          )
        );
      }
    });
  } else {
    history.push(`/`);
  }
  return <Navigate to={`${url}`}></Navigate>;
};

export default MyNavigator;
