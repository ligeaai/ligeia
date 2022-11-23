import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
import history from "../../routers/history";
const MyNavigator = () => {
  const dispatch = useDispatch();
  const { myKey } = useParams();
  const drawerMenu = useSelector((state) => state.drawerMenu.data);
  var url = "/";

  if (drawerMenu) {
    const configurationItems = drawerMenu.Configuration.Items;
    Object.keys(configurationItems).map((e) => {
      var myKeyValidator = configurationItems[e].SHORT_LABEL.toLowerCase();
      myKeyValidator = myKeyValidator.replace(/ /g, "_");
      if (myKey === myKeyValidator) {
        var tempUrl =
          configurationItems[e].Items[
            Object.keys(configurationItems[e].Items)[0]
          ].SHORT_LABEL.toLowerCase();
        tempUrl = tempUrl.replace(/ /g, "_");
        console.log(tempUrl);
        url = `${window.location.pathname}/${tempUrl}`;
        console.log(url);
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
  console.log(url);
  return <Navigate to={`${url}`}></Navigate>;
};

export default MyNavigator;
