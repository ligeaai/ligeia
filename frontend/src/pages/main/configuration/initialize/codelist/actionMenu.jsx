import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import { selectNewCodeListItem } from "../../../../../services/actions/codelist/treeview";
import {
  deleteCodeList,
  saveCodeList,
} from "../../../../../services/actions/codelist/datagrid";
import { setConfirmation } from "../../../../../services/reducers/confirmation";
import ConfirmDataGrid from "./confirmDataGrid";

const CodelistActionMenu = () => {
  const changedRows = useSelector(
    (state) => state.dataGridCodeList.changedRows
  );
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(selectNewCodeListItem());
  };
  const save = () => {
    if (changedRows.length !== 0) {
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
  return <ActionMenu btnNew={btnNew} save={save} btnDelete={btnDelete} />;
};

export default CodelistActionMenu;
