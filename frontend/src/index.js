import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configureStore';
import { MainPageSkeleton, ErrorBoundary } from "./components"
import App from './pages/App';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./assets/styles/styles.scss"
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ErrorBoundary>
        <Provider store={store}>
            <PersistGate loading={<MainPageSkeleton />} persistor={persistor} >
                <App />
            </PersistGate>
        </Provider>
    </ErrorBoundary>
);

reportWebVitals();
