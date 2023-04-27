import * as React from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import {
  setSelectedCollapseMenu,
  updateCollapseMenuCouch,
} from "../../services/actions/collapseMenu/collapseMenu";
import {
  loadTapsOverview,
  cleanTabs,
  updateLayouts,
  selectTab,
} from "../../services/actions/overview/taps";
import history from "../../routers/history";
import {
  overviewBreadcrumpGo,
  filterMenu,
} from "../../services/actions/collapseMenu/collapseMenu";
import { useIsMount } from "../../hooks/useIsMount";
import ItemLinkService from "../../services/api/itemLink";
import "../../assets/styles/page/overview/collapseTreeMenu.scss";
import { updateTreeViewCouch } from "../../services/actions/treeview/treeview";
function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
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
  color: theme.palette.primary.main,
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
  },
  ".MuiTreeItem-label": {
    fontSize: "14px !important",
    lineHeight: "1.57 !important",
    letterSpacing: "0.00714em !important",
    fontWeight: "500 !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: "4px",
  },

  ".mySelected": {
    backgroundColor: "rgba(33, 33, 33, 0.5) !important",
  },
  ".mySelectedNo": {
    backgroundColor: "inherit !important",
  },
}));
const MyStyledTreeItem = React.memo(({ myItems, path, location }) => {
  const dispatch = useDispatch();

  const onHandleClick = async (way, e) => {
    dispatch(updateLayouts());
    dispatch(
      await setSelectedCollapseMenu({
        ...e,
        path: `${way}/${e.FROM_ITEM_NAME}`,
      })
    );
    dispatch(loadTapsOverview());
    history.push(`/${way}/${e.FROM_ITEM_NAME}`);
  };
  return myItems.map((e, i) => {
    const pathname = decodeURI(location.slice(1));
    if (e.CHILD)
      return (
        <StyledTreeItem
          key={i}
          nodeId={e.LINK_ID}
          label={e.FROM_ITEM_NAME}
          onClick={async () => {
            onHandleClick(path, e);
          }}
          ContentProps={{
            className:
              `${path}/${e.FROM_ITEM_NAME}` === pathname
                ? "collapse-menu-selected"
                : "mySelectedNo",
          }}
        >
          <MyStyledTreeItem
            myItems={e.CHILD}
            path={`${path}/${e.FROM_ITEM_NAME}`}
            location={location}
          ></MyStyledTreeItem>
        </StyledTreeItem>
      );
    return (
      <StyledTreeItem
        key={i}
        nodeId={e.LINK_ID}
        label={e.FROM_ITEM_NAME}
        ContentProps={{
          className:
            `${path}/${e.FROM_ITEM_NAME}` === pathname
              ? "collapse-menu-selected"
              : "mySelectedNo",
        }}
        onClick={async () => {
          onHandleClick(path, e);
        }}
      ></StyledTreeItem>
    );
  });
});
function CustomizedTreeView({ onOpen, setWidthTrue }) {
  const ref = React.createRef();
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.collapseMenu.selectedItem);
  const items = useSelector((state) => state.collapseMenu.filerMenu);
  const expandedItems = useSelector(
    (state) => state.treeview.width.values.overviewHierarchy
  );
  const text = useSelector((state) => state.searchBar.text);
  const location = useLocation();
  const timerOnOpen = () => {
    var tempDiv = $("<div>")
      .css({
        width: "min-content",
        position: "absolute",
        left: "-9999px",
      })
      .appendTo($("body"));

    tempDiv.text($(".treemenu-container__box__element-box").text());
    var width = tempDiv.width();

    tempDiv.remove();
    if ($(".treemenu-container__box").width() < width) {
      $(".treemenu-container__box").animate({ width: width + 5 }, 400);
      dispatch(updateTreeViewCouch("overview", width + 5));
    }
  };
  const onNodeSelect = (event, nodeId) => {
    if (event.target.tagName === "svg" || event.target.tagName === "path") {
      const index = expandedItems.indexOf(nodeId);
      const copyExpanded = [...expandedItems];
      if (index === -1) {
        copyExpanded.push(nodeId);
        setTimeout(timerOnOpen, 400);
      } else {
        copyExpanded.splice(index, 1);
      }
      dispatch(updateCollapseMenuCouch(copyExpanded));
    }
  };
  async function myFunc(e) {
    dispatch(updateLayouts());
    dispatch(await setSelectedCollapseMenu({ ...e }));
    dispatch(loadTapsOverview());
    history.push(`/${e.path}`);
    try {
      let persist = localStorage.getItem("persist:root");
      persist = JSON.parse(persist);
      let tapsOverview = JSON.parse(persist.tapsOverview);
      dispatch(selectTab(tapsOverview.selected));
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    const path = location.pathname.slice(1);
    if (isMount) {
      if (selectedItem) myFunc(selectedItem);
    } else {
      if (selectedItem) {
        if (path === selectedItem.path) myFunc(selectedItem);
        else {
          let val = overviewBreadcrumpGo(items, path);
          if (val !== "overview") myFunc(val);
          else {
            dispatch(cleanTabs());
          }
        }
      }
    }

    return () => {
      dispatch(updateLayouts());
    };
  }, [location.pathname]);
  React.useEffect(() => {
    if (!isMount) {
      const body = JSON.stringify({
        FROM_ITEM_NAME: text,
      });
      dispatch(filterMenu(text, ItemLinkService.elasticSearch, body));
    }
  }, [text]);
  return (
    <TreeView
      aria-label="customized"
      expanded={expandedItems}
      defaultCollapseIcon={<MinusSquare className="MyIcon" />}
      defaultExpandIcon={<PlusSquare className="MyIcon" />}
      defaultEndIcon={<CloseSquare />}
      onNodeSelect={onNodeSelect}
      ref={ref}
    >
      <MyStyledTreeItem
        myItems={items}
        path={"overview"}
        location={location.pathname}
        onNodeSelect={onNodeSelect}
      ></MyStyledTreeItem>
    </TreeView>
  );
}

export default React.memo(CustomizedTreeView);
