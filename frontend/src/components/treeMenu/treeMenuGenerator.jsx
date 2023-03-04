import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "./treeMenu";

import {
  loadTreeviewItem,
  selectTreeViewItem,
  cleanTreeview,
} from "../../services/actions/treeview/treeview";
import { setText } from "../../services/actions/searchBar";
const TreeMenuItems = ({ path, textPath, historyPathLevel }) => {
  const dispatch = useDispatch();
  const filteredTreeItems = useSelector(
    (state) => state.treeview.filteredMenuItem
  );
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const selectFunc = (index) => {
    dispatch(selectTreeViewItem(index, textPath, historyPathLevel));
  };
  React.useEffect(() => {
    dispatch(loadTreeviewItem(path, textPath));
    return async () => {
      dispatch(await cleanTreeview());
      dispatch(setText(""));
    };
  }, []);
  return (
    <>
      <TreeMenu
        items={filteredTreeItems}
        selectFunc={selectFunc}
        selectedIndex={selectedIndex}
        primaryText={textPath}
      />
    </>
  );
};

export default TreeMenuItems;
