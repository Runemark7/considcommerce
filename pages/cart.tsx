import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {removeItemFromCart} from "../store/cartSlice";

const Cart = () => {
    // @ts-ignore
    const data = useSelector((state)=>(state.cart))
    const dispatch = useDispatch();

    return(
        <div className={"cartWrapper"}>
            {data.products.map((product: any) => (
                <div className={"cartItemWrapper"} key={product.title}>
                    <Link href={`http://localhost:3000/product/${product.title}`}>
                        <div className={"cartItem"}>
                            <h3 className={"productTitle"}>{product.title}</h3>
                            <p className={"productPrice"}>{product.price}</p>
                            <p>{product.quantity}x{product.price} = {Math.round((product.price * product.quantity)*100)/100}</p>
                        </div>
                    </Link>
                    <button
                        onClick={()=>{
                            dispatch(removeItemFromCart(product))
                        }}
                    >X</button>
                </div>
            ))}
            <div>
                <p>
                    totalprice: {Math.round(data.totalprice*100)/100}
                </p>
            </div>
        </div>
    )
}

//should use some kind of hook

export default Cart
