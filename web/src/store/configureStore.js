import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { authReducer, codelistReducer, drawerReducer, errorReducer, langReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        auth: authReducer,
        drawer: drawerReducer,
        error: errorReducer,
        lang: langReducer,
        codelist: codelistReducer,
    },
    middleware: [thunk, logger]
})