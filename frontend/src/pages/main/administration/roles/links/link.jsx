import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsActiveLink } from "../../../../../services/actions/roles/link";

import RolesLinks from "./rolesLinks";
import { Box } from "@mui/material";
const Link = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.treeview.selectedItem.ROLES_NAME);
  React.useEffect(() => {
    dispatch(setIsActiveLink(true));
    return () => {
      dispatch(setIsActiveLink(false));
    };
  }, []);
  return (
    <Box className="roles-container__body__property-box__links">
      {name ? <RolesLinks /> : <></>}
    </Box>
  );
};

export default Link;
