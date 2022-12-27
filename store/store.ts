import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import storage from './sync_storage';

import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

const combinedReducer = combineReducers({
    "cart" : cartSlice,
    "user" : authSlice,
});

const bindMiddleware = (middleware:any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }:any) => {
    if (isServer) {
        //If it's on server side, create a store
        return createStore(
            combinedReducer,
            bindMiddleware([thunkMiddleware])
        )
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer } = require('redux-persist');

        const persistConfig = {
            key: 'root',
            version: 22,
            whitelist: ["cart", "user"], // only counter will be persisted, add other reducers if needed
            storage, // if needed, use a safer storage
        };

        const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer


        const store = createStore(
            persistedReducer,
            bindMiddleware([thunkMiddleware])
        )


        let persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

        return {store, persistor};
    }
};

export const wrapper = createWrapper(makeStore);