import React from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { Box, Grid } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { SearchBarMobile } from "../../../components";

import {
  loadTreeViewWidth,
  updateTreeViewCouch,
} from "../../../services/actions/treeview/treeview";

const DrawerMenu = (props) => {
  const dispatch = useDispatch();
  const { Element, path } = props;
  function saveWidth(width) {
    dispatch(updateTreeViewCouch(path, width));
  }
  function showLeftArrow() {
    $(".treemenu-container__box__toggle-button-left").show();
    $(".treemenu-container__box__toggle-button-right").hide();
  }
  function showRightArrow() {
    $(".treemenu-container__box__toggle-button-left").hide();
    $(".treemenu-container__box__toggle-button-right").show();
  }
  function openTreeMenu(width) {
    showLeftArrow();
    $(".treemenu-container__box").animate({ width: width }, 400);
  }
  function closeTreeMenu() {
    showRightArrow();
    $(".treemenu-container__box").animate({ width: 0 }, 400);
  }

  const handler = (mouseDownEvent) => {
    const startSize = $(".treemenu-container__box").width();
    const startPosition = mouseDownEvent.pageX;
    document.getElementById("main-box").style.userSelect = "none";
    function onMouseMove(mouseMoveEvent) {
      if (startSize - startPosition + mouseMoveEvent.pageX < 10) {
        $(".treemenu-container__box").width(0);
        showRightArrow();
      } else {
        $(".treemenu-container__box").width(
          startSize - startPosition + mouseMoveEvent.pageX
        );
        showLeftArrow();
      }
    }
    function onMouseUp() {
      document.getElementById("main-box").style.userSelect = "text";
      dispatch(
        updateTreeViewCouch(path, $(".treemenu-container__box").width())
      );
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };
  React.useEffect(() => {
    const myFunc = async () => {
      var res = await dispatch(await loadTreeViewWidth(path));
      console.log(res[path]);
      res[path] > 0 ? openTreeMenu(res[path]) : closeTreeMenu();
      $(".treemenu-container__box__toggle-button").show();
    };
    myFunc();
  }, []);

  return (
    <Box className="treemenu-container">
      <Box className="treemenu-container__box">
        <Box className="treemenu-container__box__search-bar">
          <SearchBarMobile />
        </Box>
        <Box
          className="treemenu-container__box__toggle-button"
          onClick={() => {
            if ($(".treemenu-container__box").width() > 0) {
              closeTreeMenu();
              saveWidth(0);
            } else {
              openTreeMenu(250);
              saveWidth(250);
            }
          }}
        >
          <ChevronLeftIcon className="treemenu-container__box__toggle-button-left" />
          <ChevronRightIcon className="treemenu-container__box__toggle-button-right" />
        </Box>
        <Box className="treemenu-container__box__divider" />
        <Box className="treemenu-container__box__element-box">{Element}</Box>
      </Box>
      <Box
        className="treemenu-container__resize-border"
        onMouseDown={handler}
      />
    </Box>
  );
};

export default React.memo(DrawerMenu);
