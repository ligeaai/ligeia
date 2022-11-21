import React from "react";
import { useSelector } from "react-redux";
import { Box, MenuItem } from "@mui/material";
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

  // var myList = [];
  // myList.push("");
  // console.log(params);
  // var temp = params.row.CODE.sort((a, b) => (a.CODE > b.CODE ? 1 : -1));
  // console.log(temp);
  // temp.map((e) => {
  //   if (e.CODE_TEXT) {
  //     myList.push(e.CODE_TEXT);
  //   } else {
  //   }
  // });
  // console.log(myList);
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
        // valueOptions={myList}
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
              "& :first-of-type": {
                height: "27px",
              },
            },
          },
        }}
      >
        {/* {myList.map((e) => (
          <MenuItem value={e}>{e}</MenuItem>
        ))} */}
      </GridEditSingleSelectCell>
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
  //console.log(params);
  // const deneme = {
  //   TEXT: <GridEditInputCell {...params} />,
  //   HISTORY: (
  //     <GridEditDateCell
  //       type="date"
  //       value={params.row[params.field]}
  //       {...params}
  //     />
  //   ),
  //   NUMBER: <InputCell {...params} />,
  //   INT: <InputCell {...params} />,
  //   BOOL: <GridEditBooleanCell checked={false} type="checkbox" {...params} />,
  //   CODE: <SingleSelectCell {...params} />,
  // };

  // return (
  //   <>
  //     {React.useMemo(() => {
  //       try {
  //         return deneme[params.row.PROPERTY_TYPE];
  //       } catch {
  //         return <GridEditInputCell {...params} />;
  //       }
  //     })}
  //   </>
  // );

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
  }
  //  else if (params.row.PROPERTY_TYPE === "DATETIME") {
  //   return <GridEditDateCell type="date" {...params} />;
  // }
  else {
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
