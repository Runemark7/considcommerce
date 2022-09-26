import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from "../models/user";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

interface AuthState {
    loggedIn: boolean,
    username: string
    userId: number
    jwtToken: string
}

const initialState = {
    loggedIn: false,
    username: "",
    userId: 0,
    jwtToken: ""
} as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser (state, action: PayloadAction<User>) {
            state.loggedIn = true;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.jwtToken = action.payload.jwtToken;
        },
        logoutUser (state) {
            state.loggedIn = false;
            state.username = "";
            state.userId = 0;
            state.jwtToken = "";
        },
        userState (state) {
            return state
        }
    },

    extraReducers:{
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    }
})

export const { loginUser, logoutUser, userState } = authSlice.actions

export const selectAuthState = (state: AppState) => state.user.loggedIn;

export default authSlice.reducer
