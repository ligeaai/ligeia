import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyBox } from "../../../../../components";
import { setIsActiveLink } from "../../../../../services/actions/roles/link";

import RolesLinks from "./rolesLinks";
const Link = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.treeview.selectedItem.ROLES_NAME);
  React.useEffect(() => {
    dispatch(setIsActiveLink(true));
    return () => {
      dispatch(setIsActiveLink(false));
    };
  }, []);
  return <MyBox Element={name ? <RolesLinks /> : <></>} />;
};

export default Link;
