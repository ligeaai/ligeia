import { configureStore } from '@reduxjs/toolkit'

import { drawerReducer, langReducer, authReducer } from '../services/reducers'

export default configureStore({
    reducer: {
        drawer: drawerReducer,
        lang: langReducer,
        auth: authReducer
    },
})