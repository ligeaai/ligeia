import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { FixedSizeList } from "react-window";

import Main from "../../../../layout/main/main";
import {
  Breadcrumb,
  ActionMenu,
  PropLinkTabs,
  ItemSperatorLineXL,
  DateBreak,
  ComponentError,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import { loadCompanyName } from "../../../../services/api/couchApi/company";

import AutoSizer from "react-virtualized-auto-sizer";
import {
  setLoaderFalse,
  setLoaderTrue,
} from "../../../../services/actions/loader";
import Properties from "./properties";

const TreeMenuItem = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  function RenderRow(props) {
    const { data, index, style } = props;
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
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
          onClick={(event) => handleListItemClick(event, index)}
        >
          <ListItemText
            primary={`${data[index].name}`}
            sx={{
              span: { fontSize: "12px" },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const [treeItem, setTreeItem] = React.useState(false);
  React.useEffect(() => {
    dispatch(setLoaderTrue());
    const getData = async () => {
      let data = await loadCompanyName();
      setTreeItem(data);
      dispatch(setLoaderFalse());
    };
    getData();
  }, []);
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
              itemCount={Object.keys(treeItem.data.companies).length}
              itemData={treeItem.data.companies}
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

const UnitOneBody = (type) => {
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
      <ComponentError errMsg="Error">
        <DrawerMenu Element={TreeMenuItem()} />
      </ComponentError>

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
              mx: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
            }}
          >
            <DateBreak />
          </Grid>
          <ItemSperatorLineXL />
          <Grid
            item
            sx={{
              mx: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ActionMenu />
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <PropLinkTabs
              MyProperties={<Properties type={type}></Properties>}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const UnitOne = (props) => {
  const { type } = props;
  return <Main Element={UnitOneBody(type)} delSearchBar={true} />;
};

export default UnitOne;
