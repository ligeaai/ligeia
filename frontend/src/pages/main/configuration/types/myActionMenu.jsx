import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../components";

import { deleteType } from "../../../../services/actions/type/datagrid";
import { selectTreeViewItem } from "../../../../services/actions/treeview/treeview";
import { confirmationPushHistory } from "../../../../services/utils/historyPush";
const TypeActionMenu = () => {
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(selectTreeViewItem(-2, "new"));
  };
  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "TYPE"));
  };
  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "TYPE"));
  };
  const save = () => {
    dispatch(confirmationPushHistory());
  };

  const btnDelete = () => {
    dispatch(deleteType());
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
    />
  );
};

export default TypeActionMenu;
