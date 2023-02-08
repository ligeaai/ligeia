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
    authReducer,
    checkedList,
    confirmation,
    collapseMenu,
    historyConfirmation,
    cssUserSelect,
    dataGridCodeList,
    dataGridResourceList,
    dataGridType,
    drawerMenu,
    errorReducer,
    project,
    fullScreenReducer,
    itemDataGrid,
    itemLinkEditor,
    langReducer,
    loaderReducer,
    overviewDialog,
    registerFormReducer,
    searchBarReducer,
    tags,
    tapsOverview,
    themeReducer,
    treeview,

} from '../services/reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['drawerMenu', "lang", "theme", "collapseMenu", "tapsOverview"]
}

const rootReducer = combineReducers({
    auth: authReducer,
    checkedList: checkedList,
    confirmation: confirmation,
    collapseMenu: collapseMenu,
    historyConfirmation: historyConfirmation,
    cssUserSelect: cssUserSelect,
    dataGridCodeList: dataGridCodeList,
    dataGridResourceList: dataGridResourceList,
    dataGridType: dataGridType,
    drawerMenu: drawerMenu,
    error: errorReducer,
    project: project,
    fullScreen: fullScreenReducer,
    itemDataGrid: itemDataGrid,
    itemLinkEditor: itemLinkEditor,
    lang: langReducer,
    loader: loaderReducer,
    overviewDialog: overviewDialog,
    registerForm: registerFormReducer,
    searchBar: searchBarReducer,
    tags: tags,
    tapsOverview: tapsOverview,
    theme: themeReducer,
    treeview: treeview,

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
