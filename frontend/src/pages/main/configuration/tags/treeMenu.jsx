import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "../../../../components";
import {
  cleanTreeMenuSelect,
  loadTreeView,
  selectTreeview,
} from "../../../../services/actions/tags/tagsTreeview";
export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const treeItems = useSelector((state) => state.tagsTreeview.treeMenuItem);
  const selectedIndex = useSelector(
    (state) => state.tagsTreeview.selectedItem.selectedIndex
  );

  const selectFunc = (index) => {
    dispatch(selectTreeview(index));
  };

  React.useEffect(() => {
    dispatch(loadTreeView());
  }, []);
  return (
    <>
      <TreeMenu
        items={treeItems}
        selectFunc={selectFunc}
        selectedIndex={selectedIndex}
        primaryText="NAME"
      />
    </>
  );
};
