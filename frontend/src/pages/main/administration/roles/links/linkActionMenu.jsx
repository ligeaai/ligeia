import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";

const LinksActionMenu = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
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
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
      btnNewIsDisabled={true}
      saveIsDisabled={true}
      btnDeleteIsDisabled={true}
      saveGoNextIsDisabled={selectedIndex === -2 || selectedIndex === -3}
      saveGoPrevIsDisabled={selectedIndex === -2 || selectedIndex === -3}
    />
  );
};

export default LinksActionMenu;
