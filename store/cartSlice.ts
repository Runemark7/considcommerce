import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Product from "../models/Product";

interface CartState {
    products: Product[],
    totalprice: number
}

const initialState = {
    products: [],
    totalprice: 0
} as CartState

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart (state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(item => item.title === action.payload.title);
            if(index == -1){
                state.products.push(action.payload)
            }else{
                state.products[index].quantity++;
            }
            state.totalprice += action.payload.price
        },
        removeItemFromCart(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(item => item.title === action.payload.title);
            if(index == -1){
                state.products = state.products.filter(item => action.payload.title !== item.title)
            }else{
                if (state.products[index].quantity == 1){
                    state.products = state.products.filter(item => action.payload.title !== item.title)
                }else{
                    state.products[index].quantity--;
                }
            }
            state.totalprice -= action.payload.price;
        },

    },
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions

export default cartSlice.reducer
