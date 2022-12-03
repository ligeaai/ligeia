import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TreeMenu } from "../../../../components";
import {
  loadTreeviewItem,
  selectTreeViewItem,
  cleanTreeview,
} from "../../../../services/actions/treeview/treeview";

import TypeService from "../../../../services/api/type";

export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const treeItems = useSelector((state) => state.treeview.filteredMenuItem);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  React.useEffect(() => {
    dispatch(loadTreeviewItem(TypeService.getAll, "TYPE"));
  }, []);

  const selectFunc = (index) => {
    dispatch(selectTreeViewItem(index, "TYPE"));
    return async () => {
      dispatch(await cleanTreeview());
    };
  };

  return (
    <>
      <TreeMenu
        items={treeItems}
        selectFunc={selectFunc}
        selectedIndex={selectedIndex}
        primaryText="TYPE"
      />
    </>
  );
};
