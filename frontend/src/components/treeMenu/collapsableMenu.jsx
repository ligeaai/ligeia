import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { uuidv4 } from "../../services/utils/uuidGenerator";
import { setSelectedCollapseMenu } from "../../services/actions/collapseMenu/collapseMenu";
import {
  loadTapsOverview,
  cleanTabs,
  updateCouchDb,
} from "../../services/actions/overview/taps";
import history from "../../routers/history";
// web.cjs is required for IE11 support
//import { useSpring, animated } from 'react-spring/web.cjs';

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  return (
    <div>
      <Collapse {...props} />
    </div>
  );
}

TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
  },
}));
const MyStyledTreeItem = React.memo(({ myItems, path }) => {
  const dispatch = useDispatch();
  console.log(myItems);
  return myItems.map((e, i) => {
    if (e.CHILD)
      return (
        <StyledTreeItem
          sx={{ color: "status.primary" }}
          key={i}
          nodeId={`${uuidv4()}`}
          label={e.TO_ITEM_NAME}
          onClick={async () => {
            dispatch(updateCouchDb());
            dispatch(await setSelectedCollapseMenu(e));
            dispatch(loadTapsOverview());
            history.push(`/${path}/${e.TO_ITEM_NAME}`);
          }}
        >
          {/* <StyledTreeItem
            sx={{ color: "status.primary" }}
            key={i}
            nodeId={`${uuidv4()}+1`}
            label={e.TO_ITEM_NAME}
            onClick={async () => {
             
              history.push(`/${path}/${e.TO_ITEM_NAME}`);
            }}
          ></StyledTreeItem> */}
          <MyStyledTreeItem
            myItems={e.CHILD}
            path={`${path}/${e.TO_ITEM_NAME}`}
          ></MyStyledTreeItem>

          {/* <StyledTreeItem
            nodeId={`${uuidv4()}`}
            label={e.TO_ITEM_NAME}
          ></StyledTreeItem> */}
        </StyledTreeItem>
      );
    return (
      <StyledTreeItem
        sx={{ color: "status.primary" }}
        key={i}
        nodeId={`${uuidv4()}`}
        label={e.TO_ITEM_NAME}
        onClick={async () => {
          dispatch(updateCouchDb());
          dispatch(await setSelectedCollapseMenu(e));
          dispatch(loadTapsOverview());
          history.push(`/${path}/${e.TO_ITEM_NAME}`);
        }}
      ></StyledTreeItem>
    );
  });
});
function CustomizedTreeView() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.collapseMenu.menuItems);
  React.useEffect(() => {
    return () => {
      dispatch(updateCouchDb());
      dispatch(cleanTabs());
    };
  }, []);

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["1"]}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
    >
      <MyStyledTreeItem myItems={items} path={"overview"}></MyStyledTreeItem>
    </TreeView>
  );
}

export default React.memo(CustomizedTreeView);
