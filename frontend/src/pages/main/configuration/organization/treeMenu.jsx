import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "../../../../components";

import {
  showItem,
  selectItem,
  selectItemNoSave,
  confirmDataGridDontSaveGo,
} from "../../../../services/actions/company/item";

import { saveAgreeFunc } from "../../../../services/actions/company/linkEditor";

export const TreeMenuItems = ({ isLinksActive }) => {
  const dispatch = useDispatch();
  const treeItems = useSelector((state) => state.item.treeMenuItem);
  const type = useSelector((state) => state.item.type);
  const selectedIndex = useSelector(
    (state) => state.item.selectedItem.selectedIndex
  );
  const changedLinks = useSelector((state) => state.linkEditor.changedLinks);
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
  const linkSelectFunc = (index) => {
    if (changedLinks.size !== 0) {
      dispatch(saveAgreeFunc(() => dispatch(selectItemNoSave(index))));
      dispatch({
        type: "confirmation/setExtraBtn",
        payload: {
          extraBtnText: "Don't save, next",
          extrafunction: () => dispatch(selectItemNoSave(index)),
        },
      });
    } else {
      dispatch(selectItemNoSave(index));
    }
  };

  React.useEffect(() => {
    dispatch(showItem());
  }, [type]);

  return (
    <TreeMenu
      items={treeItems}
      selectFunc={isLinksActive ? linkSelectFunc : selectFunc}
      selectedIndex={selectedIndex}
      primaryText="NAME"
    />
  );
};
