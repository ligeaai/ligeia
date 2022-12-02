import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import { selectNewCodeListItem } from "../../../../../services/actions/codelist/treeview";
import {
  deleteCodeList,
  saveCodeList,
  saveAndMoveCodeList,
  addNewCodeListItemSchema,
} from "../../../../../services/actions/codelist/datagrid";
import {
  setConfirmation,
  setExtraBtn,
} from "../../../../../services/reducers/confirmation";
import ConfirmDataGrid from "./confirmDataGrid";
import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
const CodelistActionMenu = () => {
  const changedRows = useSelector(
    (state) => state.dataGridCodeList.changedRows
  );
  const deletedRows = useSelector(
    (state) => state.dataGridCodeList.deletedRows
  );
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const treeMenuItemLenght = useSelector(
    (state) => state.treeview.filteredMenuItem.length
  );
  const dispatch = useDispatch();
  const btnNew = () => {
    if (changedRows.length !== 0 || deletedRows.length !== 0) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this code list?",
          body: <ConfirmDataGrid />,
          agreefunction: async () => {
            dispatch(saveCodeList());
            dispatch(addNewCodeListItemSchema());
          },
        })
      );
      dispatch(
        setExtraBtn({
          extraBtnText: "Don't save go",
          extrafunction: () => {
            dispatch(addNewCodeListItemSchema());
          },
        })
      );
    } else {
      dispatch(addNewCodeListItemSchema());
    }
  };
  const save = () => {
    if (changedRows.length !== 0 || deletedRows.length !== 0) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this code list?",
          body: <ConfirmDataGrid />,
          agreefunction: async () => {
            dispatch(saveCodeList());
          },
        })
      );
    }
  };

  const btnDelete = () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete this code list?",
        body: <ConfirmDataGrid />,
        agreefunction: () => {
          dispatch(deleteCodeList());
        },
      })
    );
  };

  const saveGoPrev = () => {
    if (changedRows.length !== 0 || deletedRows.length !== 0) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this code list?",
          body: <ConfirmDataGrid />,
          agreefunction: async () => {
            dispatch(saveAndMoveCodeList(selectedIndex - 1));
          },
        })
      );
      dispatch(
        setExtraBtn({
          extraBtnText: "Don't save go",
          extrafunction: () => {
            dispatch(selectTreeViewItem(selectedIndex - 1, "CODE"));
          },
        })
      );
    } else {
      var index = selectedIndex - 1;
      if (index < 0) {
        index = treeMenuItemLenght - 1;
      } else if (index > treeMenuItemLenght - 1) {
        index = 0;
      }
      dispatch(selectTreeViewItem(index, "CODE"));
    }
  };

  const saveGoNext = () => {
    if (changedRows.length !== 0 || deletedRows.length !== 0) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this code list?",
          body: <ConfirmDataGrid />,
          agreefunction: async () => {
            dispatch(saveAndMoveCodeList(selectedIndex + 1));
          },
        })
      );
      dispatch(
        setExtraBtn({
          extraBtnText: "Don't save go",
          extrafunction: () => {
            dispatch(selectTreeViewItem(selectedIndex + 1, "CODE"));
          },
        })
      );
    } else {
      var index = selectedIndex + 1;
      if (index < 0) {
        index = treeMenuItemLenght - 1;
      } else if (index > treeMenuItemLenght - 1) {
        index = 0;
      }
      dispatch(selectTreeViewItem(index, "CODE"));
    }
  };

  return (
    <ActionMenu
      dublicateIsActive={false}
      infoIsActive={false}
      btnNew={btnNew}
      save={save}
      btnDelete={btnDelete}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
    />
  );
};

export default CodelistActionMenu;
