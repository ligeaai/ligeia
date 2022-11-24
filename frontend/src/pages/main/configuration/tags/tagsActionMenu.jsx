import React from "react";
import { useDispatch } from "react-redux";

import { ActionMenu } from "../../../../components";
import { selectTreeview } from "../../../../services/actions/tags/tagsTreeview";
import { saveTag } from "../../../../services/actions/tags/tags";
const TagsActionMenu = () => {
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(selectTreeview(-2));
  };
  const save = () => {
    dispatch(saveTag());
  };
  return <ActionMenu btnNew={btnNew} save={save} />;
};

export default TagsActionMenu;
