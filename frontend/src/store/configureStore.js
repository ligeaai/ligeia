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
    companyDataGrid,
    companyCheckedList,
    confirmation,
    historyConfirmation,
    cssUserSelect,
    dataGridCodeList,
    dataGridType,
    drawerMenu,
    errorReducer,
    project,
    highchart,
    fullScreenReducer,
    item,
    langReducer,
    loaderReducer,
    linkEditor,
    registerFormReducer,
    searchBarReducer,
    tags,
    tagsTreeview,
    themeReducer,
    treeview,

} from '../services/reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['drawerMenu', 'item', "lang"]
}

const rootReducer = combineReducers({
    auth: authReducer,
    companyDataGrid: companyDataGrid,
    companyCheckedList: companyCheckedList,
    confirmation: confirmation,
    historyConfirmation: historyConfirmation,
    cssUserSelect: cssUserSelect,
    dataGridCodeList: dataGridCodeList,
    dataGridType: dataGridType,
    drawerMenu: drawerMenu,
    error: errorReducer,
    project: project,
    highchart: highchart,
    fullScreen: fullScreenReducer,
    item: item,
    lang: langReducer,
    loader: loaderReducer,
    linkEditor: linkEditor,
    registerForm: registerFormReducer,
    searchBar: searchBarReducer,
    tags: tags,
    tagsTreeview: tagsTreeview,
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


