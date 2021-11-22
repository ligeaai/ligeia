<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Login</h1>
    </div>
  );
}
=======

import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Routes from './routes/index';
import themes from './themes';
import NavigationScroll from './layouts/NavigationScroll';

function App() {
=======

import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Routes from './routes/index';
import themes from './themes';
import NavigationScroll from './layouts/NavigationScroll';

function App() {
>>>>>>> bf3cee6279744b3ef768fe9e27159bed5cf0d9e0
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

<<<<<<< HEAD
>>>>>>> bf3cee6279744b3ef768fe9e27159bed5cf0d9e0
=======
>>>>>>> bf3cee6279744b3ef768fe9e27159bed5cf0d9e0

export default App;
