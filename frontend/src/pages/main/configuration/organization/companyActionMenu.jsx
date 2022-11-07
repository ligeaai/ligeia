import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionMenu } from "../../../../components";
import {
  saveItem,
  selectItem,
  deleteItem,
  confirmDataGrid,
  selectItemNoSave,
  confirmDataGridDontSaveGo,
} from "../../../../services/actions/company/item";
const CompanyActionMenu = () => {
  const selectedIndex = useSelector(
    (state) => state.item.selectedItem.selectedIndex
  );
  const dispatch = useDispatch();
  const btnNew = () => {
    if (
      !dispatch(
        confirmDataGridDontSaveGo(
          () => {
            dispatch(selectItem(-2));
          },
          "Are you sure you want to save this?",
          () => {
            dispatch(selectItemNoSave(-2));
          }
        )
      )
    ) {
      dispatch(selectItemNoSave(-2));
    }
  };
  const btnDelete = () => {
    dispatch({
      type: "IS_CHANGED_HANDLER",
      payload: true,
    });
    dispatch(
      confirmDataGrid(() => {
        dispatch(deleteItem());
      }, "Are you sure you want to delete this?")
    );
    dispatch({
      type: "IS_CHANGED_HANDLER",
      payload: false,
    });
  };
  const save = () => {
    dispatch(
      confirmDataGrid(() => {
        dispatch(saveItem());
      }, "Are you sure you want to save this?")
    );
  };
  const saveGoNext = () => {
    if (
      !dispatch(
        confirmDataGridDontSaveGo(
          () => {
            dispatch(selectItem(selectedIndex + 1));
          },
          "Are you sure you want to save this?",
          () => {
            dispatch(selectItemNoSave(selectedIndex + 1));
          }
        )
      )
    ) {
      dispatch(selectItemNoSave(selectedIndex + 1));
    }
  };
  const saveGoPrev = () => {
    if (
      !dispatch(
        confirmDataGridDontSaveGo(
          () => {
            dispatch(selectItem(selectedIndex - 1));
          },
          "Are you sure you want to save this?",
          () => {
            dispatch(selectItemNoSave(selectedIndex - 1));
          }
        )
      )
    ) {
      dispatch(selectItemNoSave(selectedIndex - 1));
    }
  };

  return (
    <ActionMenu
      btnNew={btnNew}
      btnDelete={btnDelete}
      save={save}
      saveGoNext={saveGoNext}
      saveGoPrev={saveGoPrev}
      infoIsActive={false}
      dublicateIsActive={false}
    />
  );
};

export default CompanyActionMenu;
