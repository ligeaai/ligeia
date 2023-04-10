import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import { setConfirmation } from "../../../../../services/reducers/confirmation";

import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
import { setIsActiveConfirmation } from "../../../../../services/actions/confirmation/historyConfirmation";
import {
  loadNewRolesSchema,
  deleteRole,
  saveRole,
} from "../../../../../services/actions/roles/properties";
const PropertiesActionMenu = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem.ROLES_NAME);
  const btnNew = () => {
    dispatch(loadNewRolesSchema());
    dispatch(selectTreeViewItem(-2, "new", 2));
  };
  const save = () => {
    dispatch(saveRole());
  };

  const btnDelete = () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete this ?",
        body: `${name ? name : "new"}`,
        agreefunction: () => {
          dispatch(deleteRole());
          dispatch(setIsActiveConfirmation(false));
        },
      })
    );
  };

  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "ROLES_NAME", 2));
  };

  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "ROLES_NAME", 2));
  };

  return (
    <ActionMenu
      dublicateIsActive={false}
      infoIsActive={false}
      btnNew={btnNew}
      save={save}
      btnDelete={btnDelete}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
      saveIsDisabled={selectedIndex === -3}
      btnDeleteIsDisabled={selectedIndex === -2 || selectedIndex === -3}
      saveGoNextIsDisabled={selectedIndex === -2 || selectedIndex === -3}
      saveGoPrevIsDisabled={selectedIndex === -2 || selectedIndex === -3}
    />
  );
};

export default PropertiesActionMenu;
