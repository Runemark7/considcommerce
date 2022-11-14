import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {addItemToCart,addMultipleItemsToCart,removeMultipleItemsFromCart, removeAllOfThisItemFromCart, removeItemFromCart} from "../store/cartSlice";
import Product from "../models/Product";
import Image from "next/image"
import {FormEvent} from "react";

const Cart = () => {
    // @ts-ignore
    const data = useSelector((state)=>(state.cart))
    const dispatch = useDispatch();

    const changeQuantity = (e: FormEvent, product: Product) => {
        const newQuantity = e.target.value
        const qtyChangeNegative = product.product_quantity-newQuantity
        const qtyChangeAddition = newQuantity-product.product_quantity
        const dispatchObj = {
            product: product,
            qty: 0
        }

        if (newQuantity != 0){
            if (newQuantity > product.product_quantity){
                if(qtyChangeAddition > 1){
                    dispatchObj.qty = qtyChangeAddition
                    dispatch(addMultipleItemsToCart(dispatchObj))
                }else{
                    dispatch(addItemToCart(product))
                }
            }else {
                if(qtyChangeNegative > 1){
                    dispatchObj.qty = qtyChangeNegative
                    dispatch(removeMultipleItemsFromCart(dispatchObj))
                }else{
                    dispatch(removeItemFromCart(product))
                }
            }
        }
    }

    return(
        <div>
            <div className={"cartWrapper componentWrapper twocols seventy-thirty"}>
                <div className={"leftCol"}>
                    <h1>Cart</h1>
                    <h3>Products in cart</h3>
                    {data.products.map((product: Product) => (
                        <div className={"cartItemWrapper"} key={product.post_name}>
                            <Link href={`http://localhost:3000/product/${product.post_slug}`}>
                                <div className={"cartItem"}>
                                    <div className={"cartItemImage"}>
                                        <Image
                                            src={product.post_featuredImage}
                                            width={859}
                                            height={1163}
                                            alt={""}
                                        />
                                    </div>
                                    <div className={"cartItemInfo"}>
                                        <p className={"productTitle"}>{product.post_name}</p>
                                    </div>
                                </div>
                            </Link>
                            <div>
                                <p className={"productPrice"}> {product.product_price} SEK</p>
                            </div>

                            <input type="number" onChange={(e)=>{
                                changeQuantity(e, product)
                            }} className={"productQuantityInput"} value={product.product_quantity}/>

                            <div>
                                <p>{product.product_quantity}x{product.product_price} = {Math.round((parseInt(product.product_price) * product.product_quantity)*100)/100} SEK</p>
                            </div>

                            <button
                                onClick={()=>{
                                    dispatch(removeAllOfThisItemFromCart(product))
                                }}
                            >X</button>
                        </div>
                    ))}
                </div>
                <div className={"rightCol"}>
                    <h3>Cart info</h3>
                    <p>totalprice: {Math.round(data.totalprice*100)/100}</p>
                    <p>Calculate shipping cost in checkout</p>
                    <Link href={"http://localhost:3000/checkout"}>
                        <button>
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Cart
