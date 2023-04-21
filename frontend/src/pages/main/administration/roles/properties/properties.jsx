import React from "react";

import { useDispatch, useSelector } from "react-redux";

import DataGrid from "./dataGrid";
import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../../services/actions/confirmation/historyConfirmation";

import { cleanRoles } from "../../../../../services/actions/roles/roles";
import {
  updateRole,
  loadRolesProps,
} from "../../../../../services/actions/roles/properties";
import NewRoleSavePopUp from "./newRoleSavePopUp";

const Properties = ({ isHome }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.treeview.selectedItem.ROLES_NAME);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  React.useEffect(() => {
    dispatch(setSaveFunctonConfirmation(updateRole));
    dispatch(setTitleConfirmation("Are you sure you want to save this ? "));
    dispatch(setBodyConfirmation(name ? name : <NewRoleSavePopUp />));
    if (selectedIndex !== -3) dispatch(cleanRoles());
    if (selectedIndex !== -2 && selectedIndex !== -3) {
      dispatch(loadRolesProps());
    }
  }, [name, selectedIndex]);
  return isHome ? <DataGrid /> : <></>;
};

export default Properties;
