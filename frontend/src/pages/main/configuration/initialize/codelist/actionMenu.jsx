import React from "react";
import { useDispatch } from "react-redux";
import { ActionMenu } from "../../../../../components";

import { selectNewCodeListItem } from "../../../../../services/actions/codelist/treeview";

const CodelistActionMenu = () => {
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(selectNewCodeListItem());
  };

  return <ActionMenu btnNew={btnNew} />;
};

export default CodelistActionMenu;
