import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../store/authSlice";
import {useEffect, useState} from "react";
import {removeItemFromCart} from "../store/cartSlice";

export default function Navbar() {
    const user = useSelector((state)=>(state.user))

    const cart = useSelector((state)=>(state.cart))

    const [cartDetails, setCartDetails] = useState(cart);

    const [miniCartToggle, setMiniCart] = useState(false);

    const toggleMiniCart = () =>{
        if (miniCartToggle){
            setMiniCart(false);
        }else{
            setMiniCart(true);
        }
    }

    useEffect(()=>{
        setCartDetails(cart)
    }, [cart.totalprice])

    const dispatch = useDispatch();

    return (
        <div className={"mainNavBar"}>
            <div className={"companyBranding"}>
                <Link href={"http://localhost:3000"}>
                    <p>
                        logo
                    </p>
                </Link>
            </div>

            <ul className={"nav"}>
                <li>
                    <Link href={"http://localhost:3000/product"}>
                        <a>shop</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/cart"}>
                        <a>Cart</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/checkout"}>
                        <a>Checkout</a>
                    </Link>
                </li>
                {!user.loggedIn ?
                    <li>
                        <Link href={"http://localhost:3000/login"}>
                            <a>Login</a>
                        </Link>
                    </li>
                    :
                    <div>
                        <li>
                            <Link href={"http://localhost:3000/profile"}>
                                <a>Profile</a>
                            </Link>
                        </li>
                        <li>
                            <a onClick={()=>{
                                const endpoint = "http://localhost:8010/proxy/logout"

                                const options = {
                                method: 'POST',
                                headers: {
                                    'Authorization': 'Bearer ' + user.jwtToken,
                                },
                            }

                                // @ts-ignore
                                fetch(endpoint, options)
                                .then(resp => {
                                dispatch(logoutUser())
                            })}}

                            >Logout</a>
                        </li>
                    </div>
                }
                <li>
                    <a onClick={()=>{
                        toggleMiniCart()
                    }} >Minicart {Math.round(cartDetails.totalprice*100)/100} ({cartDetails.totalQty})</a>
                    <div className={(miniCartToggle)?"showMiniCart":"hideMiniCart"}>
                        {cartDetails.products.map((product: any) => (
                            <div className={"cartItemWrapper"} key={product.title}>
                                <div className={"cartItem"}>
                                    <Link href={`http://localhost:3000/product/${product.title}`}>
                                        <a href={"#"} className={"productTitle"}>{product.title}</a>
                                    </Link>
                                    <p className={"productPrice"}>{product.price}</p>
                                    <p>{product.quantity}x{product.price} = {Math.round((product.price * product.quantity)*100)/100}</p>
                                </div>

                                <button className={"removeItem"}
                                        onClick={()=>{
                                            dispatch(removeItemFromCart(product))
                                        }}
                                >X</button>
                            </div>
                        ))}
                    </div>
                </li>

            </ul>
        </div>

    )
}
