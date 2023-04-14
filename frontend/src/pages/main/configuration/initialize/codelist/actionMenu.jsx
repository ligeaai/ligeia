import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

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
import { setIsActiveConfirmation } from "../../../../../services/actions/confirmation/historyConfirmation";
import {
  isCreated,
  isDeleted,
} from "../../../../../services/utils/permissions";
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
            dispatch(setIsActiveConfirmation(false));
          },
        })
      );
      dispatch(
        setExtraBtn({
          extraBtnText: "Don't save go",
          extrafunction: () => {
            dispatch(addNewCodeListItemSchema());
            dispatch(setIsActiveConfirmation(false));
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
            dispatch(setIsActiveConfirmation(false));
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
          dispatch(setIsActiveConfirmation(false));
        },
      })
    );
  };

  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "CODE"));
  };

  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "CODE"));
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
      btnNewIsDisabled={!dispatch(isCreated("CODE_LIST"))}
      btnDeleteIsDisabled={!dispatch(isDeleted("CODE_LIST"))}
    />
  );
};

export default CodelistActionMenu;
