import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { authReducer, codelistReducer, drawerReducer, errorReducer, langReducer, loaderReducer, searchBarReducer, themeReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        auth: authReducer,
        codelist: codelistReducer,
        drawer: drawerReducer,
        error: errorReducer,
        lang: langReducer,
        loader: loaderReducer,
        searchBar: searchBarReducer,
        theme: themeReducer,
    },
    middleware: [thunk, logger]
})