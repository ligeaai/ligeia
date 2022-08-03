import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import React from 'react';
import reportWebVitals from './reportWebVitals';

import store from './store/configureStore';

import App from './layout/App';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
