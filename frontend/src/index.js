import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configureStore';

import App from './pages/App';
import { ErrorBoundary } from "./components"
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);

reportWebVitals();
