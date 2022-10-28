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
  setRefreshTreeMenu,
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
  const culture = useSelector((state) => state.lang.cultur);
  const userEmail = useSelector((state) => state.auth.user.email);
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
          LIST_TYPE: "CODE_LIST",
          CULTURE: culture,
          CODE: "",
          CODE_TEXT: "",
          PARENT: "",
          LEGACY_CODE: "",
          VAL1: "",
          VAL2: "",
          VAL3: "",
          DATE1: "",
          DATE2: "",
          CHAR1: "",
          CHAR2: "",
          LAYER_NAME: "",
          LAST_UPDT_USER: userEmail,
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
      e.VAL2,
      e.VAL3,
      e.DATE1,
      e.DATE2,
      e.CHAR1,
      e.CHAR2,
      e.LAYER_NAME,
      userEmail
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
    //dispatch(setRefreshDataGrid());
    dispatch(setRefreshTreeMenu());
    //dispatch(setCodeListItems(parentCodeList.ROW_ID));
  };
  const saveGoPrev = async () => {
    dispatch(
      setIndex({
        index: codeListChild.index - 1,
      })
    );
    await save();
  };
  const saveGoNext = async () => {
    dispatch(
      setIndex({
        index: codeListChild.index + 1,
      })
    );
    await save();
  };
  const deleteParentAgreeFunc = async () => {
    await deleteCodeList(codeListChild.rowId);
    dispatch(setRefreshTreeMenu());
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
