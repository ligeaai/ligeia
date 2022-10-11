import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import {
    authReducer,
    codelistReducer,
    drawerReducer,
    errorReducer,
    fullScreenReducer,
    langReducer,
    loaderReducer,
    registerFormReducer,
    searchBarReducer,
    themeReducer
} from '../services/reducers'

export default configureStore({
    reducer: {
        auth: authReducer,
        codelist: codelistReducer,
        drawer: drawerReducer,
        error: errorReducer,
        fullScreen: fullScreenReducer,
        lang: langReducer,
        loader: loaderReducer,
        registerForm: registerFormReducer,
        searchBar: searchBarReducer,
        theme: themeReducer,
    },
    middleware: [thunk, logger]
})