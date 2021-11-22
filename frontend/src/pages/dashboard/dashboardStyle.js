const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};

const styles = theme => ({
  wrapper: {
    display: "flex",
  },
});

export default styles;
