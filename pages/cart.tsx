import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {removeItemFromCart} from "../store/cartSlice";
import Product from "../models/Product";
import Image from "next/image"
import Shipping from "../components/modules/shipping";

const Cart = () => {
    // @ts-ignore
    const data = useSelector((state)=>(state.cart))
    const dispatch = useDispatch();

    return(
        <div className={"cartWrapper twocols seventy-thirty"}>
            <div className={"leftCol"}>
                {data.products.map((product: Product) => (
                    <div className={"cartItemWrapper"} key={product.post_name}>
                        <Link href={`http://localhost:3000/product/${product.post_slug}`}>
                            <div className={"cartItem"}>
                                <div>
                                    <Image
                                        src={product.post_featuredImage}
                                        width={859}
                                        height={1163}
                                    />
                                </div>
                                <div>
                                    <p className={"productTitle"}>{product.post_name}</p>
                                    <p className={"productPrice"}>{product.product_price}</p>
                                    <p>{product.product_quantity}x{product.product_price} = {Math.round((parseInt(product.product_price) * product.product_quantity)*100)/100}</p>
                                    <button
                                        onClick={()=>{
                                            dispatch(removeItemFromCart(product))
                                        }}
                                    >X</button>
                                </div>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>
            <div className={"rightCol"}>
                <Shipping />
                <p>totalprice: {Math.round(data.totalprice*100)/100}</p>
            </div>
        </div>
    )
}

//should use some kind of hook

export default Cart
