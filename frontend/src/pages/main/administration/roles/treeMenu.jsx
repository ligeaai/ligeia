import React from "react";

import { TreeMenuItems } from "../../../../components";

import Roles from "../../../../services/api/roles";

const TreeMenu = () => {
  return (
    <TreeMenuItems
      path={Roles.getAll}
      textPath="ROLES_NAME"
      historyPathLevel={2}
    />
  );
};

export default React.memo(TreeMenu);
