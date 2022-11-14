import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "../../../../components";

import {
  showItem,
  selectItem,
  selectItemNoSave,
  confirmDataGridDontSaveGo,
} from "../../../../services/actions/company/item";

export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const treeItems = useSelector((state) => state.item.treeMenuItem);
  const type = useSelector((state) => state.item.type);
  const selectedIndex = useSelector(
    (state) => state.item.selectedItem.selectedIndex
  );
  const selectFunc = (index) => {
    if (
      !dispatch(
        confirmDataGridDontSaveGo(
          () => {
            dispatch(selectItem(index));
          },
          "Are you sure you want to save this?",
          () => {
            dispatch(selectItemNoSave(index));
          }
        )
      )
    ) {
      dispatch(selectItemNoSave(index));
    }
  };

  React.useEffect(() => {
    dispatch(showItem());
  }, [type]);

  return (
    <TreeMenu
      items={treeItems}
      selectFunc={selectFunc}
      selectedIndex={selectedIndex}
      primaryText="NAME"
    />
  );
};
