import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import {
  setConfirmation,
  setExtraBtn,
} from "../../../../../services/reducers/confirmation";

import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
import { setIsActiveConfirmation } from "../../../../../services/actions/confirmation/historyConfirmation";
import {
  saveItem,
  newItem,
  deleteItem,
} from "../../../../../services/actions/item/itemDataGrid";
const PropertiesActionMenu = () => {
  const isChanged = useSelector((state) => state.historyConfirmation.isActive);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector(
    (state) => state.treeview.selectedItem.PROPERTY_STRING
  );
  const dispatch = useDispatch();
  const btnNew = () => {
    if (isChanged) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this ?",
          body: `${name ? name : "new"}`,
          agreefunction: async () => {
            dispatch(saveItem());
            dispatch(newItem());
            dispatch(setIsActiveConfirmation(false));
          },
        })
      );
      dispatch(
        setExtraBtn({
          extraBtnText: "Don't save go",
          extrafunction: () => {
            dispatch(newItem());
            dispatch(setIsActiveConfirmation(false));
          },
        })
      );
    } else {
      dispatch(newItem());
    }
  };
  const save = () => {
    if (isChanged) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this ?",
          body: `${name ? name : "new"}`,
          agreefunction: async () => {
            dispatch(saveItem());
            dispatch(setIsActiveConfirmation(false));
          },
        })
      );
    }
  };

  const btnDelete = () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete this ?",
        body: `${name ? name : "new"}`,
        agreefunction: () => {
          dispatch(deleteItem());
          dispatch(setIsActiveConfirmation(false));
        },
      })
    );
  };

  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "NAME"));
  };

  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "NAME"));
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

export default PropertiesActionMenu;
