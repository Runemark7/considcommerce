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

interface ProductMulti {
    product: Product,
    qty: number

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
        removeAllOfThisItemFromCart(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(item => item.post_name === action.payload.post_name);

            const removedQty = state.products[index].product_quantity
            const removedPrice = parseInt(state.products[index].product_price)*removedQty

            state.totalprice -= removedPrice;
            state.totalQty -= removedQty;


            state.products = state.products.filter(item => action.payload.post_name !== item.post_name)
        },
        removeMultipleItemsFromCart(state, action: PayloadAction<ProductMulti>){
            const index = state.products.findIndex(item => item.post_name === action.payload.product.post_name);
            if (action.payload.qty < 0){
                removeAllOfThisItemFromCart(action.payload.product)
            }else{
                if (state.products[index].product_quantity > action.payload.qty){
                    state.products[index].product_quantity -= action.payload.qty;
                    state.totalprice -= parseInt(action.payload.product.product_price)*action.payload.qty;
                    state.totalQty -= action.payload.qty;
                }
            }
        },
        addMultipleItemsToCart(state, action: PayloadAction<ProductMulti>) {
            const index = state.products.findIndex(item => item.post_name === action.payload.product.post_name);

            if (index != -1){
                state.products[index].product_quantity += action.payload.qty;
                state.totalprice += parseInt(action.payload.product.product_price)*action.payload.qty;
                state.totalQty += action.payload.qty;
            }
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

export const { addItemToCart, removeItemFromCart, removeMultipleItemsFromCart, addMultipleItemsToCart,removeAllOfThisItemFromCart, addShippingCost} = cartSlice.actions

export default cartSlice.reducer
