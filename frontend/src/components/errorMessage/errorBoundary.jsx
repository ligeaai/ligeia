import React from "react";
import ErrorPage from "../../pages/error/errorPage";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(true);
  }, []);

  return hasError ? <ErrorPage /> : children;
};

export default ErrorBoundary;


// import React from "react";
// import ErrorPage from "../../pages/error/errorPage";

// export class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return <ErrorPage />;
//     }

//     return this.props.children;
//   }
// }
