import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "../../../../../components";

import {
  loadTreeviewItem,
  selectTreeViewItem,
  cleanTreeview,
} from "../../../../../services/actions/treeview/treeview";

import { saveAndMoveCodeList } from "../../../../../services/actions/codelist/datagrid";

import {
  setConfirmation,
  setExtraBtn,
} from "../../../../../services/reducers/confirmation";

import ConfirmDataGrid from "./confirmDataGrid";
import CodelistService from "../../../../../services/api/codeList";

export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const filteredTreeItems = useSelector(
    (state) => state.treeview.filteredMenuItem
  );
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const changedRows = useSelector(
    (state) => state.dataGridCodeList.changedRows
  );
  const deletedRows = useSelector(
    (state) => state.dataGridCodeList.deletedRows
  );
  const selectFunc = (index) => {
    dispatch(selectTreeViewItem(index, "CODE"));
  };
  React.useEffect(() => {
    dispatch(loadTreeviewItem(CodelistService.getAllTreeitem, "CODE_TEXT"));
    return () => {
      dispatch(cleanTreeview());
    };
  }, []);
  return (
    <>
      <TreeMenu
        items={filteredTreeItems}
        selectFunc={selectFunc}
        selectedIndex={selectedIndex}
        primaryText="CODE_TEXT"
      />
    </>
  );
};
