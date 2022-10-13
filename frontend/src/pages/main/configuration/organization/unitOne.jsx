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
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import { loadCompanyName } from "../../../../services/api/couchApi/company";

import AutoSizer from "react-virtualized-auto-sizer";
import {
  setLoaderFalse,
  setLoaderTrue,
} from "../../../../services/actions/loader";
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

const UnitOneBody = () => {
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
      <DrawerMenu Element={TreeMenuItem()} />
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
            xs={12}
            sx={{
              backgroundColor: "myBackgroundColor",
              height: "42px",
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                px: 1.5,
                alignItems: "center",
                height: "100%",
              }}
            >
              <Grid item>
                <DateBreak />
              </Grid>
              <Grid item>
                <ActionMenu />
              </Grid>
            </Grid>
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <PropLinkTabs />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const UnitOne = () => {
  return <Main Element={UnitOneBody()} delSearchBar={true} />;
};

export default UnitOne;
