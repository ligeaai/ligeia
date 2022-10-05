import React from "react";
import { Box } from "@mui/material";
import TreeView from "@material-ui/lab/TreeView";
import MuiTreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { setBreadcrumb } from "../../services/reducers/breadcrumbReducer";

const TreeItem = withStyles({
  selected: {},
})(MuiTreeItem);

const GetTreeItemsFromData = (treeItems) => {
  const dispatch = useDispatch();
  return treeItems.map((treeItemData) => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = GetTreeItemsFromData(treeItemData.children);
    }
    return (
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.title}
        icon={treeItemData.icon}
        children={children}
        onClick={() => {
          dispatch(setBreadcrumb(treeItemData.url));
        }}
      />
    );
  });
};
const DataTreeView = ({ treeItems }) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {GetTreeItemsFromData(treeItems)}
    </TreeView>
  );
};

function App({ menu }) {
  return (
    <Box className="App" sx={{ pl: 2 }}>
      <DataTreeView treeItems={menu} />
    </Box>
  );
}

export default App;
