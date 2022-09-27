import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import Product from "../models/Product";
import ShippingOption from "../models/shippingOption";

interface CartState {
    products: Product[],
    shippingObj: ShippingOption,
    totalprice: number,
    totalQty: number
}

const initStateShipping : ShippingOption= {
    shippingName:"free",
    shippingEstimateDelivery: "5-7",
    shippingCost:0,
}

const initialState = {
    products: [],
    shippingObj: initStateShipping,
    totalprice: 0,
    totalQty: 0
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
            state.totalQty += 1;
        },
        removeItemFromCart(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(item => item.title === action.payload.title);
            if(index < -1){
                state.products = state.products.filter(item => action.payload.title !== item.title)
            }else{
                if (state.products[index].quantity == 1){
                    state.products = state.products.filter(item => action.payload.title !== item.title)
                }else{
                    state.products[index].quantity--;
                }
            }
            state.totalprice -= action.payload.price;
            state.totalQty -= 1;
        },
        addShippingCost (state, action: PayloadAction<ShippingOption>){
            let tempPrice = state.totalprice;

            if(state.shippingObj != action.payload){
                tempPrice -= state.shippingObj.shippingCost;
                tempPrice += action.payload.shippingCost;
            }

            return Object.assign({}, state, {
                shippingObj: action.payload,
                totalprice: tempPrice
            });
        },
        clearItemFromCart(state, action: PayloadAction<any>){
        }
    },
})

export const { addItemToCart, removeItemFromCart, clearItemFromCart, addShippingCost} = cartSlice.actions

export default cartSlice.reducer
