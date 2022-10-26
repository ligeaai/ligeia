import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { FixedSizeList } from "react-window";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Main from "../../../../layout/main/main";
import {
  ActionMenu,
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  ComponentErrorBody,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import ChildCodeListDataTable from "./childCodeListDataTable";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  setLoaderFalse,
  setLoaderTrue,
} from "../../../../services/actions/loader";
import { getParentCodeList } from "../../../../services/api/djangoApi/codeList";
import {
  setCodeListChild,
  setIndex,
  setLastItemIndex,
  setRowId,
} from "../../../../services/reducers/codeListChildReducer";

import {
  deleteCodeList,
  putCodeList,
} from "../../../../services/api/djangoApi/codeList";
import { setConfirmation } from "../../../../services/reducers/confirmation";
import {
  setParentCodeList,
  setIsUpdated,
} from "../../../../services/reducers/parentCodelist";
const TreeMenuItem = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const codeListChild = useSelector((state) => state.codeListChild);
  function RenderRow(props) {
    const { data, index, style } = props;
    useEffect(() => {
      if (codeListChild.index !== -2) {
        setSelectedIndex(codeListChild.index);
        dispatch(
          setCodeListChild({
            currentChild: data[codeListChild.index].CODE,
          })
        );

        dispatch(
          setRowId({
            rowId: data[codeListChild.index].ROW_ID,
          })
        );
      }
    }, [codeListChild.index]);
    useEffect(() => {
      dispatch(
        setLastItemIndex({
          lastItem: data.length,
        })
      );
    }, []);
    return (
      <ListItem
        style={style}
        key={index}
        component="div"
        disablePadding
        sx={{
          ".MuiButtonBase-root": {
            py: 0.5,
          },
        }}
      >
        <ListItemButton
          selected={selectedIndex === index}
          onClick={(event) => {
            dispatch(
              setIndex({
                index: index,
              })
            );
          }}
        >
          <ListItemText
            primary={`${data[index].CODE_TEXT}`}
            sx={{
              span: {
                fontSize: "12px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }
  const parentCodelist = useSelector((state) => state.parentCodelist.isUpdated);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const culture = useSelector((state) => state.lang.cultur);
  const [treeItem, setTreeItem] = React.useState(false);
  React.useEffect(() => {
    dispatch(setLoaderTrue());
    const getData = async () => {
      let data = await getParentCodeList(culture);
      setTreeItem(data);
      dispatch(setLoaderFalse());
    };
    getData();
  }, [codeListChild.lastItem, parentCodelist]);
  if (treeItem) {
    return (
      <Box
        sx={{
          height: isFullScreen
            ? "calc(100vh - 85px)"
            : "calc(100vh - 85px - 60px)",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={35}
              itemCount={treeItem.data.length}
              itemData={treeItem.data.sort((a, b) =>
                a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
              )}
              overscanCount={5}
            >
              {RenderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    );
  }
};

const TreeMenuItems = () => {
  return (
    <ComponentError
      errMsg={
        <ComponentErrorBody
          text="Something went wrong"
          icon={<ErrorOutlineIcon />}
        />
      }
    >
      <TreeMenuItem />
    </ComponentError>
  );
};

const MyActionMenu = () => {
  const dispatch = useDispatch();
  const codeListChild = useSelector((state) => state.codeListChild);
  const parentCodeList = useSelector((state) => state.parentCodelist);
  const culture = useSelector((state) => state.lang.cultur);
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const btnNew = () => {
    var uuid = uuidv4();
    dispatch(
      setParentCodeList({
        ROW_ID: uuid.replace(/-/g, ""),
        LIST_TYPE: "",
        CULTURE: culture,
        CODE: "",
        CODE_TEXT: "",
        PARENT: "",
        LEGACY_CODE: "",
        VAL1: "",
        VAL2: "",
        VAL3: "",
        VAL4: "",
        VAL5: "",
        VAL6: "",
        VAL7: "",
        VAL8: "",
        VAL9: "",
        VAL10: "",
        DATE1: "",
        DATE2: "",
        DATE3: "",
        DATE4: "",
        DATE5: "",
        CHAR1: "",
        CHAR2: "",
        CHAR3: "",
        CHAR4: "",
        CHAR5: "",
        LAYER_NAME: "",
        DESCRIPTION_ID: "",
        HIDDEN: "",
        LAST_UPDT_USER: "",
        LAST_UPDT_DATE: "",
      })
    );
    dispatch(
      setRowId({
        rowId: uuid.replace(/-/g, ""),
      })
    );
    dispatch(setIndex({ index: -2 }));
  };
  const save = async () => {
    if (parentCodeList.isUpdated) {
      await putCodeList(
        parentCodeList.CODE,
        parentCodeList.CODE_TEXT,
        parentCodeList.CULTURE,
        parentCodeList.LIST_TYPE,
        parentCodeList.ROW_ID,
        parentCodeList.PARENT,
        parentCodeList.LEGACY_CODE,
        parentCodeList.VAL1,
        parentCodeList.VAL2,
        parentCodeList.VAL3,
        parentCodeList.VAL4,
        parentCodeList.VAL5,
        parentCodeList.VAL6,
        parentCodeList.VAL7,
        parentCodeList.VAL8,
        parentCodeList.VAL9,
        parentCodeList.VAL10,
        parentCodeList.DATE1,
        parentCodeList.DATE2,
        parentCodeList.DATE3,
        parentCodeList.DATE4,
        parentCodeList.DATE5,
        parentCodeList.CHAR1,
        parentCodeList.CHAR2,
        parentCodeList.CHAR3,
        parentCodeList.CHAR4,
        parentCodeList.CHAR5,
        parentCodeList.LAYER_NAME,
        parentCodeList.DESCRIPTION_ID,
        parentCodeList.HIDDEN,
        parentCodeList.LAST_UPDT_USER,
        parentCodeList.LAST_UPDT_DATE
      );
      dispatch(setIsUpdated(false));
    }
  };
  const saveGoPrev = () => {
    save();
    dispatch(
      setIndex({
        index: codeListChild.index - 1,
      })
    );
  };
  const saveGoNext = () => {
    save();
    dispatch(
      setIndex({
        index: codeListChild.index + 1,
      })
    );
  };
  const deleteParentAgreeFunc = async () => {
    dispatch(setLoaderTrue);
    deleteCodeList(codeListChild.rowId);
    dispatch(setLastItemIndex(codeListChild.lastItem - 1));
    dispatch(setLoaderFalse);
  };
  const deleteParent = async () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete this code list?",
        body: "here will come the code list",
        agreefunction: deleteParentAgreeFunc,
      })
    );
  };

  return (
    <ActionMenu
      btnNew={btnNew}
      save={save}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
      deleteParent={deleteParent}
    />
  );
};

const CodeListBody = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <DrawerMenu Element={<TreeMenuItems />} />

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
          width: "500px",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              height: "42px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "myTreeViewBg",
              color: "text.primary",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            }}
          >
            <Box sx={{ ml: 2.5 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Box sx={{ ml: 2 }}>
            <MyActionMenu />
          </Box>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <ComponentError errMsg="Error">
              <PropLinkTabs MyProperties={<ChildCodeListDataTable />} />
            </ComponentError>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const CodeList = () => {
  return <Main Element={CodeListBody()} delSearchBar={true} />;
};

export default CodeList;
