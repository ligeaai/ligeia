import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import {
    authReducer,
    codelistReducer,
    codeListChildReducer,
    confirmation,
    drawerReducer,
    errorReducer,
    fullScreenReducer,
    langReducer,
    loaderReducer,
    registerFormReducer,
    searchBarReducer,
    themeReducer,
    typeReducer,
    typeTextReducer
} from '../services/reducers'

export default configureStore({
    reducer: {
        auth: authReducer,
        codelist: codelistReducer,
        codeListChild: codeListChildReducer,
        confirmation: confirmation,
        drawer: drawerReducer,
        error: errorReducer,
        fullScreen: fullScreenReducer,
        lang: langReducer,
        loader: loaderReducer,
        registerForm: registerFormReducer,
        searchBar: searchBarReducer,
        theme: themeReducer,
        type: typeReducer,
        typeText: typeTextReducer
    },
    middleware: [thunk, logger]
})