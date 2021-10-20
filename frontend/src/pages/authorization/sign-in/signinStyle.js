// import styled from "styled-components";
// import {Paper, TextField, Typography, Button, Grid} from "@mui/material";
// import {Link} from "react-router-dom";

// export const GridContainer = styled(Grid)`
//   justify-content: center;
//   align-items: center;
//   margin-top: 100px;
//   margin-bottom: 100px;
// `;

// export const PaperContainer = styled(Paper)`
//   margin: 50px auto;
//   padding: 40px;
//   height: 350px;
//   width: 400px;
//   box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1) !important;
// `;

// export const ButtonStyled = styled(Button)`
//   width: 400px;
//   height: 50px;
//   background-color: #458bf3 !important;
//   border-radius: 10px;
//   font-weight: medium;
//   text-transform: none;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
// `;

// export const TextFieldStyled = styled(TextField)`
//   background: white;
//   & label.Mui-focused {
//     color: white;
//   }
//   & .MuiInput-underline:after {
//     border-bottom-color: white;
//   }
//   & .MuiOutlinedInput-root {
//     & fieldset {
//       border-color: white;
//     }
//     &:hover fieldset {
//       border-color: white;
//     }
//     &.Mui-focused fieldset {
//       border-color: white;
//     }
//   }
// `;

// export const LinkStyled = styled(Link)`
//   text-decoration: none;
//   &:visited {
//     color: #458bf3;
//   }
// `;

// export const TypographyButtonStyled = styled(Typography)`
//   text-transform: none;
//   font-size: 24px;
//   font-weight: 700;
// `;

const styles = () => ({

  wrapper: {
    marginTop: "100px",
    marginBottom: "100px",
  },

  container: {

  },

  paper: {
    margin: "50px auto",
    padding: "40px",
    height: "350px",
    width: "400px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1) !important"
  },

  customButton: {
    width: "400px",
    height: "50px",
    backgroundColor: "#458bf3 !important",
    borderRadius: "10px",
    fontWeight: "medium",
    textTransform: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    marginTop: "30px !important"

  },

  buttonTypography: {
    textTransform: "none",
    fontSize: "24px !important",
    fontWeight: "700"
  },

  customLink: {
    textDecoration: "none",
    '&:visited': {
      color: "#458bf3"
    }
  }
})

export default styles;