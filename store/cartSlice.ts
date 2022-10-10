import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import Product from "../models/Product";
import ShippingOption from "../models/shippingOption";
import {act} from "react-dom/test-utils";

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
            const index = state.products.findIndex(item => item.post_name === action.payload.post_name);
            if(index == -1){
                action.payload.product_quantity = 1
                state.products.push(action.payload)
            }else{
                state.products[index].product_quantity++;
            }
            state.totalprice += parseInt(action.payload.product_price)
            state.totalQty += 1;
        },
        removeItemFromCart(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(item => item.post_name === action.payload.post_name);
            if(index < -1){
                state.products = state.products.filter(item => action.payload.post_name !== item.post_name)
            }else{
                if (state.products[index].product_quantity == 1){
                    state.products = state.products.filter(item => action.payload.post_name !== item.post_name)
                }else{
                    state.products[index].product_quantity--;
                }
            }
            state.totalprice -= parseInt(action.payload.product_price);
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
