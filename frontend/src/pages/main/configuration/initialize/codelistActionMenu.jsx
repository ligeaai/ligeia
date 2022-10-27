import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteCodeList,
  putCodeList,
} from "../../../../services/api/djangoApi/codeList";
import { setConfirmation } from "../../../../services/reducers/confirmation";
import {
  setParentCodeList,
  setIsUpdated,
} from "../../../../services/reducers/parentCodelist";
import {
  setIndex,
  setLastItemIndex,
  setCodeListItems,
  setRowId,
} from "../../../../services/reducers/codeListChildReducer";
import { ActionMenu } from "../../../../components";
const CodelistActionMenu = () => {
  const dispatch = useDispatch();
  const codeListChild = useSelector((state) => state.codeListChild);
  const parentCodeList = useSelector((state) => state.parentCodelist);
  const culture = useSelector((state) => state.lang.cultur);
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const btnNew = () => {
    var uuid = uuidv4();
    dispatch(
      setParentCodeList({
        ROW_ID: uuid.replace(/-/g, ""),
        LIST_TYPE: "",
        CULTURE: culture,
        CODE: "",
        CODE_TEXT: "",
        PARENT: "",
        LEGACY_CODE: "",
        VAL1: "",
        VAL2: "",
        VAL3: "",
        VAL4: "",
        VAL5: "",
        VAL6: "",
        VAL7: "",
        VAL8: "",
        VAL9: "",
        VAL10: "",
        DATE1: "",
        DATE2: "",
        DATE3: "",
        DATE4: "",
        DATE5: "",
        CHAR1: "",
        CHAR2: "",
        CHAR3: "",
        CHAR4: "",
        CHAR5: "",
        LAYER_NAME: "",
        DESCRIPTION_ID: "",
        HIDDEN: "",
        LAST_UPDT_USER: "",
        LAST_UPDT_DATE: "",
      })
    );
    dispatch(
      setRowId({
        rowId: uuid.replace(/-/g, ""),
      })
    );
    dispatch(setIndex({ index: -2 }));
  };

  const save = async () => {
    if (parentCodeList.isUpdated) {
      await putCodeList(
        parentCodeList.CODE,
        parentCodeList.CODE_TEXT,
        parentCodeList.CULTURE,
        parentCodeList.LIST_TYPE,
        parentCodeList.ROW_ID,
        parentCodeList.PARENT,
        parentCodeList.LEGACY_CODE,
        parentCodeList.VAL1,
        parentCodeList.VAL2,
        parentCodeList.VAL3,
        parentCodeList.VAL4,
        parentCodeList.VAL5,
        parentCodeList.VAL6,
        parentCodeList.VAL7,
        parentCodeList.VAL8,
        parentCodeList.VAL9,
        parentCodeList.VAL10,
        parentCodeList.DATE1,
        parentCodeList.DATE2,
        parentCodeList.DATE3,
        parentCodeList.DATE4,
        parentCodeList.DATE5,
        parentCodeList.CHAR1,
        parentCodeList.CHAR2,
        parentCodeList.CHAR3,
        parentCodeList.CHAR4,
        parentCodeList.CHAR5,
        parentCodeList.LAYER_NAME,
        parentCodeList.DESCRIPTION_ID,
        parentCodeList.HIDDEN,
        parentCodeList.LAST_UPDT_USER,
        parentCodeList.LAST_UPDT_DATE
      );
      dispatch(setCodeListItems(parentCodeList.ROW_ID));
      dispatch(setIsUpdated(false));
    }
  };
  const saveGoPrev = async () => {
    save();
    dispatch(
      setIndex({
        index: codeListChild.index - 1,
      })
    );
  };
  const saveGoNext = () => {
    save();
    dispatch(
      setIndex({
        index: codeListChild.index + 1,
      })
    );
  };
  const deleteParentAgreeFunc = async () => {
    deleteCodeList(codeListChild.rowId);
    dispatch(setLastItemIndex(codeListChild.lastItem - 1));
  };
  const deleteParent = async () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete this code list?",
        body: "here will come the code list",
        agreefunction: deleteParentAgreeFunc,
      })
    );
  };

  return (
    <ActionMenu
      btnNew={btnNew}
      save={save}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
      btnDelete={deleteParent}
      dublicateIsActive={false}
    />
  );
};

export default CodelistActionMenu;
