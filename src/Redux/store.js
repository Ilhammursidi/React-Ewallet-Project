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
import authReducer from './slice/authslice'
import registerReducer from './slice/register'

const persistConfig = {
    key: "im28",
    storage,
    whitelist:["addUser","loginUser"]
}

const persistedReducer = persistCombineReducers(persistConfig,{
    addUser: registerReducer,
    auth: authReducer
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