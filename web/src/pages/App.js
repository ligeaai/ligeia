import React from 'react';
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppRouter from '../routers/appRouter'

import Loading from '../components/loading';

const App = () => {
    const theme = useSelector((state) => state.theme.theme);
    const darkTheme = createTheme({
        palette: {
            mode: theme,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Loading Element={<AppRouter />} />
        </ThemeProvider>
    );
}

export default App;
