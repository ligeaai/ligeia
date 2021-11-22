import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Routes from './routes/index';
import themes from './themes';
import NavigationScroll from './layouts/NavigationScroll';

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

export default App;
