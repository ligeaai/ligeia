import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TreeMenuItems } from "../../../../components";

import {
  loadTreeviewItem,
  cleanTreeview,
  filterMenu,
} from "../../../../services/actions/treeview/treeview";

import { useIsMount } from "../../../../hooks/useIsMount";
import WorkflowService from "../../../../services/api/workflow";

const TreeMenu = () => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!isMount) {
      dispatch(loadTreeviewItem(pathFunction, "NAME"));
    }
    return async () => {
      dispatch(await cleanTreeview());
    };
  }, []);

  const pathFunction = async (body, cancelToken) => {
    return await WorkflowService.getAll(body, cancelToken);
  };

  return (
    <TreeMenuItems path={pathFunction} textPath="NAME" historyPathLevel={2} />
  );
};

export default React.memo(TreeMenu);
