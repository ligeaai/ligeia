import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { TreeMenu } from "../../../../../components";

import {
  loadTreeviewItemCodelist,
  selectTreeViewItemCoedlist,
} from "../../../../../services/actions/codelist/treeview";

import { saveAndMoveCodeList } from "../../../../../services/actions/codelist/datagrid";

import {
  setConfirmation,
  setExtraBtn,
} from "../../../../../services/reducers/confirmation";

import ConfirmDataGrid from "./confirmDataGrid";

export const TreeMenuItems = () => {
  const dispatch = useDispatch();
  const filteredTreeItems = useSelector(
    (state) => state.treeviewCodelist.filteredMenuItem
  );
  const selectedIndex = useSelector(
    (state) => state.treeviewCodelist.selectedItem.selectedIndex
  );
  const changedRows = useSelector(
    (state) => state.dataGridCodeList.changedRows
  );
  const deletedRows = useSelector(
    (state) => state.dataGridCodeList.deletedRows
  );
  const selectFunc = (index) => {
    if (changedRows.length !== 0 || deletedRows.length !== 0) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this code list?",
          body: <ConfirmDataGrid />,
          agreefunction: async () => {
            dispatch(saveAndMoveCodeList(index));
          },
        })
      );
      dispatch(
        setExtraBtn({
          extraBtnText: "Don't save go",
          extrafunction: () => {
            dispatch(selectTreeViewItemCoedlist(index));
          },
        })
      );
    } else {
      dispatch(selectTreeViewItemCoedlist(index));
    }
  };
  React.useEffect(() => {
    dispatch(loadTreeviewItemCodelist());
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
