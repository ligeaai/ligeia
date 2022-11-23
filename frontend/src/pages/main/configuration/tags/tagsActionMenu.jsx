import React from "react";
import { useDispatch } from "react-redux";

import { ActionMenu } from "../../../../components";
import { selectTreeview } from "../../../../services/actions/tags/tagsTreeview";
const TagsActionMenu = () => {
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(selectTreeview(-2));
  };
  return <ActionMenu btnNew={btnNew} />;
};

export default TagsActionMenu;
