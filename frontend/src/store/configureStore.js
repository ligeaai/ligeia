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
    confirmation,
    cssUserSelect,
    drawerReducer,
    errorReducer,
    fullScreenReducer,
    langReducer,
    loaderReducer,
    parentCodelist,
    registerFormReducer,
    searchBarReducer,
    themeReducer,
    typeReducer,
    typeTextReducer
} from '../services/reducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['drawer', "auth"]
}

const rootReducer = combineReducers({
    auth: authReducer,
    childCodeList: childCodeList,
    codeListChild: codeListChildReducer,
    confirmation: confirmation,
    cssUserSelect: cssUserSelect,
    drawer: drawerReducer,
    error: errorReducer,
    fullScreen: fullScreenReducer,
    lang: langReducer,
    loader: loaderReducer,
    parentCodelist: parentCodelist,
    registerForm: registerFormReducer,
    searchBar: searchBarReducer,
    theme: themeReducer,
    type: typeReducer,
    typeText: typeTextReducer
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


