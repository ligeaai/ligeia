import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
const MyNavigator = (props) => {
  const dispatch = useDispatch();
  const drawerData = useSelector((state) => state.drawerMenu.data);
  const drawerDataConfiguration = drawerData.find(
    (e) => e.LAYER_NAME === "CONFIGURATION"
  );
  React.useEffect(() => {
    dispatch(
      setSelectedDrawerItem(
        navigateItem.Items[Object.keys(navigateItem.Items)[0]].SHORT_LABEL
      )
    );
  });
  const navigateItem = drawerDataConfiguration.Items[props.mykey];

  return (
    <Navigate to={navigateItem.Items[Object.keys(navigateItem.Items)[0]].URL} />
  );
};

export default MyNavigator;
