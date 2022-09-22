import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { authReducer, codelistReducer, drawerReducer, errorReducer, langReducer, themeReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        auth: authReducer,
        codelist: codelistReducer,
        drawer: drawerReducer,
        error: errorReducer,
        lang: langReducer,
        theme: themeReducer,
    },
    middleware: [thunk, logger]
})