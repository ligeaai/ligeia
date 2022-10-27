import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import {
    authReducer,
    childCodeList,
    codeListChildReducer,
    confirmation,
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

export default configureStore({
    reducer: {
        auth: authReducer,
        childCodeList: childCodeList,
        codeListChild: codeListChildReducer,
        confirmation: confirmation,
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
    },
    middleware: [thunk, logger]
})