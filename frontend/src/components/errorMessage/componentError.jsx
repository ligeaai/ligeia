import React from "react";
import { Box } from "@mui/material";

export const ComponentError = ({ errMsg, children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(true);
  }, [errMsg]);

  return hasError ? (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {errMsg}
    </Box>
  ) : (
    children
  );
};



// import React from "react";
// import { Box } from "@mui/material";
// export class ComponentError extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <Box
//           sx={{
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {this.props.errMsg}
//         </Box>
//       );
//     }

//     return this.props.children;
//   }
// }
