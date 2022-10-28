import {Action, combineReducers, configureStore, createStore, ThunkAction} from "@reduxjs/toolkit";
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
    version: 15,
    storage,
    whiteList:["cart", "user"]
}

const presistedReducer = persistReducer(persistConfig, reducers)

export const makeStore = () =>
  configureStore({
    reducer: presistedReducer,
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


export const wrapper = createWrapper<AppStore>(makeStore);