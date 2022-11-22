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
    cssUserSelect,
    dataGridCodeList,
    drawerMenu,
    errorReducer,
    fullScreenReducer,
    item,
    langReducer,
    loaderReducer,
    linkEditor,
    registerFormReducer,
    searchBarReducer,
    themeReducer,
    treeviewCodelist,
} from '../services/reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['drawerMenu', 'item']
}

const rootReducer = combineReducers({
    auth: authReducer,
    companyDataGrid: companyDataGrid,
    companyCheckedList: companyCheckedList,
    confirmation: confirmation,
    cssUserSelect: cssUserSelect,
    dataGridCodeList: dataGridCodeList,
    drawerMenu: drawerMenu,
    error: errorReducer,
    fullScreen: fullScreenReducer,
    item: item,
    lang: langReducer,
    loader: loaderReducer,
    linkEditor: linkEditor,
    registerForm: registerFormReducer,
    searchBar: searchBarReducer,
    theme: themeReducer,
    treeviewCodelist: treeviewCodelist,
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


