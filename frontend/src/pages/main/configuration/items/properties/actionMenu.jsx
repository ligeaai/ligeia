import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import { setConfirmation } from "../../../../../services/reducers/confirmation";

import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
import { setIsActiveConfirmation } from "../../../../../services/actions/confirmation/historyConfirmation";
import {
  saveItem,
  deleteItem,
} from "../../../../../services/actions/item/itemDataGrid";

import {
  isCreated,
  isDeleted,
  isUpdated,
} from "../../../../../services/utils/permissions";

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
    dispatch(selectTreeViewItem(-2, "new", 3));
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
    dispatch(selectTreeViewItem(selectedIndex - 1, "PROPERTY_STRING", 3));
  };

  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "PROPERTY_STRING", 3));
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
      btnNewIsDisabled={!dispatch(isCreated("CONFIG"))}
      saveIsDisabled={
        !(
          dispatch(isCreated("CONFIG")) ||
          dispatch(isUpdated("CONFIG")) ||
          dispatch(isDeleted("CONFIG"))
        )
      }
      btnDeleteIsDisabled={!dispatch(isDeleted("CONFIG"))}
    />
  );
};

export default PropertiesActionMenu;
