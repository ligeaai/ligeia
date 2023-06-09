import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'


import storage from 'redux-persist/lib/storage';


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import {
    alarms,
    authReducer,
    checkedList,
    confirmation,
    collapseMenu,
    diagnostic,
    historyConfirmation,
    dataGridCodeList,
    dataGridResourceList,
    dataGridType,
    drawerMenu,
    errorReducer,
    project,
    profile,
    itemDataGrid,
    itemLinkEditor,
    langReducer,
    loaderReducer,
    overviewDialog,
    propLinkTap,
    registerFormReducer,
    roles,
    searchBarReducer,
    stepper,
    tags,
    tagImport,
    tapsOverview,
    themeReducer,
    treeview,
    users,
    workflow
} from '../services/reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['drawerMenu', "lang", "theme", "collapseMenu", "tapsOverview"]
}

const rootReducer = combineReducers({
    auth: authReducer,
    alarms: alarms,
    checkedList: checkedList,
    confirmation: confirmation,
    collapseMenu: collapseMenu,
    diagnostic: diagnostic,
    historyConfirmation: historyConfirmation,
    dataGridCodeList: dataGridCodeList,
    dataGridResourceList: dataGridResourceList,
    dataGridType: dataGridType,
    drawerMenu: drawerMenu,
    error: errorReducer,
    project: project,
    profile: profile,
    itemDataGrid: itemDataGrid,
    itemLinkEditor: itemLinkEditor,
    lang: langReducer,
    loader: loaderReducer,
    overviewDialog: overviewDialog,
    propLinkTap: propLinkTap,
    registerForm: registerFormReducer,
    roles: roles,
    searchBar: searchBarReducer,
    stepper: stepper,
    tags: tags,
    tagImport: tagImport,
    tapsOverview: tapsOverview,
    theme: themeReducer,
    treeview: treeview,
    users: users,
    workflow: workflow
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    middleware: [thunk, logger]
});

export const persistor = persistStore(store);
