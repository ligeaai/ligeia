import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppRouter from '../routers/AppRouter'


function App() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <AppRouter />
        </ThemeProvider>
    );
}

export default App;
