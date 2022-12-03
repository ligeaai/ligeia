import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "../../../../../components";

import {
  loadTreeviewItem,
  selectTreeViewItem,
  cleanTreeview,
} from "../../../../../services/actions/treeview/treeview";

import CodelistService from "../../../../../services/api/codeList";

export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const filteredTreeItems = useSelector(
    (state) => state.treeview.filteredMenuItem
  );
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const selectFunc = (index) => {
    dispatch(selectTreeViewItem(index, "CODE"));
  };
  React.useEffect(() => {
    dispatch(loadTreeviewItem(CodelistService.getAllTreeitem, "CODE_TEXT"));
    return async () => {
      console.log("return");
      dispatch(await cleanTreeview());
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
