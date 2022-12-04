import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionMenu } from "../../../../components";
import { selectTreeViewItem } from "../../../../services/actions/treeview/treeview";
import { deleteTag, saveNewTag } from "../../../../services/actions/tags/tags";
const TagsActionMenu = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const btnNew = () => {
    dispatch(selectTreeViewItem(-2, "new"));
  };
  const save = () => {
    dispatch(saveNewTag());
  };
  const btnDelete = () => {
    dispatch(deleteTag());
  };
  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "NAME"));
  };
  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "NAME"));
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
