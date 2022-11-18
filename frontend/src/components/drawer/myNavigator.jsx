import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
import history from "../../routers/history";
const MyNavigator = () => {
  const dispatch = useDispatch();
  const { myKey } = useParams();
  const drawerMenu = useSelector((state) => state.drawerMenu.data);
  var url = "";

  if (drawerMenu) {
    const configurationItems = drawerMenu.Configuration.Items;
    Object.keys(configurationItems).map((e) => {
      var myKeyValidator = configurationItems[e].SHORT_LABEL.toLowerCase();
      myKeyValidator = myKeyValidator.replace(/_/g, " ");
      if (myKey === myKeyValidator) {
        var tempUrl =
          configurationItems[e].Items[
            Object.keys(configurationItems[e].Items)[0]
          ].SHORT_LABEL.toLowerCase();
        tempUrl = tempUrl.replace(/ /g, "_");
        console.log(tempUrl);
        url = `${window.location.pathname}/${tempUrl}`;
        dispatch(
          setSelectedDrawerItem(
            configurationItems[e].Items[
              Object.keys(configurationItems[e].Items)[0]
            ]
          )
        );
        // history.push(`/${window.location.pathname}/${url}`);
      }
    });
  } else {
    history.push(`/home`);
  }
  return <Navigate to={`${url}`}></Navigate>;

  // var { myKey } = useParams();
  // myKey = myKey[0].toUpperCase() + myKey.substring(1);
  // const drawerDataConfiguration = drawerData["Configuration"];
  // const navigateItem = drawerDataConfiguration.Items[myKey];
  // React.useEffect(() => {
  //   dispatch(
  //     setSelectedDrawerItem(
  //       navigateItem.Items[Object.keys(navigateItem.Items)[0]]
  //     )
  //   );
  // }, []);
};

export default MyNavigator;
