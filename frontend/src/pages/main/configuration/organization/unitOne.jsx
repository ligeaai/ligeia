import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { FixedSizeList } from "react-window";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  ComponentErrorBody,
  LoadingComponent,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import DateBreak from "./dateBreak";
import Properties from "./properties";
import CompanyActionMenu from "./companyActionMenu";
import {
  showItem,
  selectItem,
  selectItemNoSave,
  confirmDataGridDontSaveGo,
} from "../../../../services/actions/company/item";

function RenderRow(props) {
  const dispatch = useDispatch();
  const { data, index, style } = props;
  const selectedIndex = useSelector(
    (state) => state.item.selectedItem.selectedIndex
  );
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
        onClick={() => {
          if (
            !dispatch(
              confirmDataGridDontSaveGo(
                () => {
                  dispatch(selectItem(index));
                },
                "Are you sure you want to save this?",
                () => {
                  dispatch(selectItemNoSave(index));
                }
              )
            )
          ) {
            dispatch(selectItemNoSave(index));
          }
        }}
      >
        <ListItemText
          primary={`${data[index].NAME}`}
          sx={{
            span: {
              fontSize: "14px",
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

const TreeMenuItem = () => {
  const dispatch = useDispatch();
  const treeItem = useSelector((state) => state.item.treeMenuItem);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const type = useSelector((state) => state.item.type);
  React.useEffect(() => {
    dispatch(showItem());
  }, [type]);

  if (treeItem) {
    return (
      <Box
        sx={{
          height: isFullScreen
            ? "calc(100vh - 85px )"
            : "calc(100vh - 85px - 60px - 4px)",
          minHeight: "416px",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={35}
              itemCount={treeItem.length}
              itemData={treeItem}
              overscanCount={5}
            >
              {RenderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    );
  } else {
    return <LoadingComponent />;
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

const UnitOne = (props) => {
  const { type } = props;
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
      <Grid item sx={{ minHeight: "500px", boxShadow: 3, mr: 0.5 }}>
        <DrawerMenu Element={<TreeMenuItems />} />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
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
            <Box sx={{ ml: 3 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Grid
            item
            sx={{
              ml: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CompanyActionMenu />
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              marginX: "2px",
              borderWidth: "0.2px",
              borderColor: "#4B4B4B",
              backgroundColor: "#4B4B4B",
            }}
          />
          <Grid
            item
            sx={{
              mr: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
            }}
          >
            <DateBreak />
          </Grid>

          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={<Properties type={type}></Properties>}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitOne;
