import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import Root from './Root';
import Routes from './routes/index';
import themes from './themes';
import NavigationScroll from './layouts/NavigationScroll';
import requireAuth from './utils/RequireAuth'
import * as actions from './redux/actions/auth'

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}


function App() {
  const customization = useSelector((state) => state.customization);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.token !== null
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);