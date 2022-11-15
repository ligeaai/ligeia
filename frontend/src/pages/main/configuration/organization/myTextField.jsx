import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  GridEditInputCell,
  GridEditDateCell,
  GridEditBooleanCell,
  GridEditSingleSelectCell,
  GridCellCheckboxRenderer,
  GridBooleanCell,
  GridCell,
} from "@mui/x-data-grid-pro";

const SingleSelectCell = (params) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const setOpen = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", function (e) {
        if (!e.target.closest(".selectItems")) {
          setIsOpen(false);
        }
      });
    }
    if (!isOpen) {
      window.removeEventListener("click", function (e) {
        if (!e.target.closest(".selectItems")) {
          setIsOpen(false);
        }
      });
    }
  }, [isOpen]);
  return (
    <Box
      className="selectItems"
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      <GridEditSingleSelectCell
        {...params}
        defaultValue={""}
        open={isOpen}
        onClick={setOpen}
        sx={{
          border: "none",
          fontSize: "14px",
        }}
        MenuProps={{
          sx: {
            "& .MuiList-root ": {
              li: {
                fontSize: "14px",
              },
              "& :first-child": {
                height: "27px",
              },
            },
          },
        }}
      />
    </Box>
  );
};

const InputCell = (params) => {
  return (
    <GridEditInputCell
      type="number"
      onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
      {...params}
    />
  );
};

export const MyTextField = (params) => {
  if (params.row.PROPERTY_TYPE === "TEXT") {
    return <GridEditInputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "HISTORY") {
    return (
      <GridEditDateCell
        type="date"
        value={params.row[params.field]}
        {...params}
      />
    );
  } else if (params.row.PROPERTY_TYPE === "NUMBER") {
    return <InputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "INT") {
    return <InputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "BOOL") {
    return <GridEditBooleanCell checked={false} type="checkbox" {...params} />;
  } else if (params.row.PROPERTY_TYPE === "CODE") {
    return <SingleSelectCell {...params} />;
  } else {
    return <GridEditInputCell {...params} />;
  }
};

export const MyTextFieldRender = (params) => {
  if (params.row.PROPERTY_TYPE === "BOOL") {
    return (
      <GridBooleanCell disabled checked={false} type="checkbox" {...params} />
    );
  } else if (params.row.PROPERTY_TYPE === "HISTORY") {
    var d = params.row[params.field].getDate();
    var m = params.row[params.field].getMonth();
    m += 1;
    var y = params.row[params.field].getFullYear();
    var newdate = d + "." + y + "." + m;
    return <Box>{newdate}</Box>;
  } else {
    return <Box>{params.row[params.field]}</Box>;
  }
};
