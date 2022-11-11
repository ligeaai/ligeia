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
    childCodeList,
    codeListChildReducer,
    companyDataGrid,
    confirmation,
    confirmCodeList,
    cssUserSelect,
    dataGridCodeList,
    drawerReducer,
    errorReducer,
    fullScreenReducer,
    item,
    langReducer,
    loaderReducer,
    linkEditor,
    parentCodelist,
    registerFormReducer,
    searchBarReducer,
    themeReducer,
    treeviewCodelist,
} from '../services/reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['drawer',]
}

const rootReducer = combineReducers({
    auth: authReducer,
    childCodeList: childCodeList,
    codeListChild: codeListChildReducer,
    companyDataGrid: companyDataGrid,
    confirmation: confirmation,
    confirmCodeList: confirmCodeList,
    cssUserSelect: cssUserSelect,
    dataGridCodeList: dataGridCodeList,
    drawer: drawerReducer,
    error: errorReducer,
    fullScreen: fullScreenReducer,
    item: item,
    lang: langReducer,
    loader: loaderReducer,
    linkEditor: linkEditor,
    parentCodelist: parentCodelist,
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


