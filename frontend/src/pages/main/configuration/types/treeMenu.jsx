import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TreeMenu } from "../../../../components";
import {
  loadTreeView,
  selectType,
} from "../../../../services/actions/type/treeview";
export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const treeItems = useSelector((state) => state.treeviewType.treeMenuItem);
  const selectedIndex = useSelector(
    (state) => state.treeviewType.selectedItem.selectedIndex
  );
  React.useEffect(() => {
    dispatch(loadTreeView());
  }, []);

  const selectFunc = (index) => {
    dispatch(selectType(index));
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
