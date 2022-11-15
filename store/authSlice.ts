import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from "../models/user";
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
        updateUserToken (state, action: PayloadAction<string>) {
            state.jwtToken = action.payload
        }

    },

})

export const { loginUser, logoutUser, updateUserToken } = authSlice.actions

export const selectAuthState = (state: AppState) => state.user.loggedIn;

export default authSlice.reducer
