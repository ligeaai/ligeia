import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../components";

import {
  addNewType,
  saveTypeFunc,
  deleteType,
} from "../../../../services/actions/type/datagrid";
import { selectType } from "../../../../services/actions/type/treeview";
const CodelistActionMenu = () => {
  const selectedIndex = useSelector(
    (state) => state.treeviewType.selectedItem.selectedIndex
  );
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(addNewType());
  };
  const saveGoPrev = () => {
    dispatch(selectType(selectedIndex - 1));
  };
  const saveGoNext = () => {
    dispatch(selectType(selectedIndex + 1));
  };
  const save = () => {
    dispatch(saveTypeFunc());
  };

  const btnDelete = () => {
    dispatch(deleteType());
  };
  return (
    <ActionMenu
      //   dublicateIsActive={false}
      //   infoIsActive={false}
      btnNew={btnNew}
      save={save}
      btnDelete={btnDelete}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
    />
  );
};

export default CodelistActionMenu;
