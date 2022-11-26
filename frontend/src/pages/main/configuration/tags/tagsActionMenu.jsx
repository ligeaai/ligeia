import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionMenu } from "../../../../components";
import { selectTreeview } from "../../../../services/actions/tags/tagsTreeview";
import {
  saveTag,
  deleteTag,
  saveNewTag,
} from "../../../../services/actions/tags/tags";
const TagsActionMenu = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.tagsTreeview.selectedItem.selectedIndex
  );
  const btnNew = () => {
    dispatch(selectTreeview(-2));
  };
  const save = () => {
    dispatch(saveNewTag());
  };
  const btnDelete = () => {
    dispatch(deleteTag());
  };
  const saveGoPrev = () => {
    dispatch(selectTreeview(selectedIndex - 1));
  };
  const saveGoNext = () => {
    dispatch(selectTreeview(selectedIndex + 1));
  };
  return (
    <ActionMenu
      btnNew={btnNew}
      save={save}
      btnDelete={btnDelete}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
      infoIsActive={false}
      dublicateIsActive={false}
    />
  );
};

export default TagsActionMenu;
