import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'

import userReducer from './slices/userSlice'

import referenciaReducer from './slices/referenciaSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        referencias:referenciaReducer
        
    }
});