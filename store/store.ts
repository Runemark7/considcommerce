/*import {Action, combineReducers, configureStore, createStore, ThunkAction} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from 'redux-thunk'

const reducers = combineReducers({
    "cart" : cartSlice,
    "user" : authSlice,
})

const persistConfig = {
    key: "root",
    version: 16,
    storage,
    whiteList:["cart", "user"]
}

const persistedReducer = persistReducer(persistConfig, reducers)


export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk]
  })

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;


export const wrapper = createWrapper<AppStore>(makeStore);*/

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import storage from './sync_storage';

import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
// If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687
// const storage = require('redux-persist/lib/storage').default;

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
    "cart" : cartSlice,
    "user" : authSlice,
});

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
    if (isServer) {
        //If it's on server side, create a store
        return configureStore({
            reducer: combinedReducer,
            devTools: true,
            middleware: [thunk]
        })
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer } = require('redux-persist');

        const persistConfig = {
            key: 'root',
            whitelist: ["cart", "user"], // only counter will be persisted, add other reducers if needed
            storage, // if needed, use a safer storage
        };

        const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer


        const store = configureStore({
            reducer: persistedReducer,
            devTools: true,
            middleware: [thunk]
        })


        store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

        return store;
    }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);