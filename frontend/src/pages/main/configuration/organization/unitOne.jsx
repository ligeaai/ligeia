import React from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import {
  Box,
  Button,
  Grid,
  Typography,
  Tab,
  Tabs,
  ToggleButtonGroup,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { FixedSizeList } from "react-window";

import Main from "../../../../layout/main/main";
import Breadcrumb from "../../../../components/breadcrumb/breadcrumb";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import ActionIcon from "../../../../components/navigationComp/actionMenu";
import TimeRangePicker from "../../../../components/navigationComp/timeRangePicker";
import PropertiesLinks from "../../../../components/navigationComp/propLinkTabs";
import { ItemSperatorLineXL } from "../../../../components/nestedMenu/nestedItems";
import DateBreak from "../../../../components/navigationComp/dateBreak";
import { loadCompanyName } from "../../../../services/api/couchApi/company";

import AutoSizer from "react-virtualized-auto-sizer";

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

  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const [treeItem, setTreeItem] = React.useState([]);
  React.useEffect(() => {
    loadCompanyName().then((res) => {
      setTreeItem(res.data.companies);
    });
  }, []);
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
            itemCount={Object.keys(treeItem).length}
            itemData={treeItem}
            overscanCount={5}
          >
            {RenderRow}
          </FixedSizeList>
        )}
      </AutoSizer>

      {/* <ToggleButtonGroup>
        {Object.keys(treeItem).map((val, key) => {
          return (
            <Button
              key={key}
              sx={{
                color: "text.primary",
                width: "90%",
                justifyContent: "flex-start",
                pl: 2,
                marginX: "5%",
                backgroundColor: grey[100],
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                position: "relative",
                fontSize: "12px",
                height: "40px",
                overflow: "hidden",
                "&:active": {
                  div: {
                    backgroundColor: "primary.main",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  width: "4px",
                  height: "100%",
                  backgroundColor: "text.secondary",
                  borderTopRightRadius: "99px",
                  borderBottomRightRadius: "99px",
                }}
              ></Box>
              {treeItem[val].name}
            </Button>
          );
        })}
      </ToggleButtonGroup> */}
    </Box>
  );
};

const UnitOneBody = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "calc(100vh - 1px)" : "calc(100vh - 60px)",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <DrawerMenu Element={TreeMenuItem()} />
      <Grid
        item
        xs={12}
        sx={{
          my: 0.5,
          mr: 0.5,
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
                <ActionIcon />
              </Grid>
            </Grid>
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <PropertiesLinks />
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
