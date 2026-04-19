import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE
} from "redux-persist";

import storage from "redux-persist/es/storage";
import env from "../utils/environment"      
import authReducer from '../Redux/slice/authslice'
import userReducer from './slice/register'

const persistConfig = {
    key: "im28",
    storage,
}


const persistedReducer = persistCombineReducers(persistConfig,{
    users : userReducer,
    auth : authReducer
})

const store = configureStore({
    reducer: persistedReducer,
    devTools: env.environment === "development",
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    REHYDRATE
                ]
            }
        })
    }
});

export const persistor = persistStore(store)
export default store;