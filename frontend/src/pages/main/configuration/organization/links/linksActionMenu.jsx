import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionMenu } from "../../../../../components";
import {
  saveItem,
  selectItem,
  confirmDataGrid,
  selectItemNoSave,
  confirmDataGridDontSaveGo,
} from "../../../../../services/actions/company/item";

import {
  saveLinkItem,
  saveAgreeFunc,
} from "../../../../../services/actions/company/linkEditor";

const CompanyActionMenu = () => {
  const selectedIndex = useSelector(
    (state) => state.item.selectedItem.selectedIndex
  );
  const changedLinks = useSelector((state) => state.linkEditor.changedLinks);

  const dispatch = useDispatch();
  const save = () => {
    if (changedLinks.size !== 0) {
      dispatch(saveAgreeFunc());
    }
  };
  const saveGoNext = () => {
    if (changedLinks.size !== 0) {
      dispatch(
        saveAgreeFunc(() => dispatch(selectItemNoSave(selectedIndex + 1)))
      );
      dispatch({
        type: "confirmation/setExtraBtn",
        payload: {
          extraBtnText: "Don't save, next",
          extrafunction: () => dispatch(selectItemNoSave(selectedIndex + 1)),
        },
      });
    } else {
      dispatch(selectItemNoSave(selectedIndex - 1));
    }
  };
  const saveGoPrev = () => {
    if (changedLinks.size !== 0) {
      dispatch(
        saveAgreeFunc(() => dispatch(selectItemNoSave(selectedIndex - 1)))
      );
      dispatch({
        type: "confirmation/setExtraBtn",
        payload: {
          extraBtnText: "Don't save, next",
          extrafunction: () => dispatch(selectItemNoSave(selectedIndex - 1)),
        },
      });
    } else {
      dispatch(selectItemNoSave(selectedIndex - 1));
    }
  };

  return (
    <ActionMenu
      save={save}
      saveGoNext={saveGoNext}
      saveGoPrev={saveGoPrev}
      infoIsDisabled={true}
      btnDeleteIsDisabled={true}
      btnNewIsDisabled={true}
      dublicateIsDisabled={true}
    />
  );
};

export default CompanyActionMenu;
