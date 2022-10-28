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
import {
  setDataGridItems,
  changeDataGridItems,
  cleanDataGridItems,
  setNewItem,
  setDeletedItem,
  setRefreshDataGrid,
  setLoading,
} from "../../../../services/reducers/childCodeList";
const CodelistActionMenu = () => {
  const dispatch = useDispatch();
  const codeListChild = useSelector((state) => state.codeListChild);
  const childCodeList = useSelector((state) => state.childCodeList);
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
    dispatch(cleanDataGridItems());
    dispatch(
      setNewItem({
        uuid: uuid.replace(/-/g, ""),
        value: {
          HIERARCHY: [`new`],
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
        },
      })
    );

    dispatch(setIndex({ index: -2 }));
  };
  const createPutBody = async (e) => {
    await putCodeList(
      e.CODE,
      e.CODE_TEXT,
      e.CULTURE,
      e.LIST_TYPE,
      e.ROW_ID,
      e.PARENT,
      e.LEGACY_CODE,
      e.VAL1,
      // e.VAL2,
      // e.VAL3,
      // e.VAL4,
      // e.VAL5,
      // e.VAL6,
      // e.VAL7,
      // e.VAL8,
      // e.VAL9,
      // e.VAL10,
      // e.DATE1,
      // e.DATE2,
      // e.DATE3,
      // e.DATE4,
      // e.DATE5,
      // e.CHAR1,
      // e.CHAR2,
      // e.CHAR3,
      // e.CHAR4,
      // e.CHAR5,
      e.LAYER_NAME
      // e.DESCRIPTION_ID,
      // e.HIDDEN,
      // e.LAST_UPDT_USER,
      // e.LAST_UPDT_DATE
    );
  };
  const save = async () => {
    // await Promise.all(
    //   Object.keys(childCodeList.newItems).map(async (e) => {
    //     await createPutBody(childCodeList.newItems[e]);
    //   })
    // );
    await Promise.all(
      Object.keys(childCodeList.dataGridItems).map(async (e) => {
        Object.keys(childCodeList.changedItems).map(async (a) => {
          if (childCodeList.changedItems[a] === e) {
            await createPutBody(childCodeList.dataGridItems[e]);
          }
        });
      })
    );
    Object.keys(childCodeList.deletedItems).map(async (a) => {
      deleteCodeList(childCodeList.deletedItems[a]);
    });
    dispatch(setRefreshDataGrid());
    //  dispatch(setCodeListItems(parentCodeList.ROW_ID));
  };
  const saveGoPrev = async () => {
    await save();
    dispatch(
      setIndex({
        index: codeListChild.index - 1,
      })
    );
  };
  const saveGoNext = async () => {
    await save();
    dispatch(
      setIndex({
        index: codeListChild.index + 1,
      })
    );
  };
  const deleteParentAgreeFunc = async () => {
    dispatch(setLoading(true));
    deleteCodeList(codeListChild.rowId);
    dispatch(setLastItemIndex(codeListChild.lastItem - 1));
    dispatch(setIndex(codeListChild.index - 1));
    dispatch(setLoading(false));
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
