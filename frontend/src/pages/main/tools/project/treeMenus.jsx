import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TreeMenuItems } from "../../../../components";

import {
  loadTreeviewItem,
  cleanTreeview,
} from "../../../../services/actions/treeview/treeview";

import { useIsMount } from "../../../../hooks/useIsMount";
import ProjectService from "../../../../services/api/project";

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
    return await ProjectService.getAll(body, cancelToken);
  };

  return (
    <TreeMenuItems path={pathFunction} textPath="NAME" historyPathLevel={2} />
  );
};

export default React.memo(TreeMenu);
