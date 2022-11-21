import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {removeItemFromCart} from "../store/cartSlice";
import Product from "../models/Product";
import SearchBar from "./searchBar";


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
                <div className="brandingWrapper">
                    <Link href={"http://localhost:3000"}>
                        <img className={"brandingImg"}  src={"/sitelogo.png"} alt="sitelogo"/>
                    </Link>
                </div>

                <div className={"searchBarWrapper"}>
                    <SearchBar/>
                </div>
                <ul>
                    {!user.loggedIn ?
                        <li>
                            <Link href={"http://localhost:3000/login"}>
                                <img className={"icon"} src={"/icons/user.svg"} alt="userIcon"/>
                                Login
                            </Link>
                        </li>
                        :
                        <div>
                            <li>
                                <Link href={"http://localhost:3000/profile"}>
                                    <img className={"icon"} src={"/icons/user.svg"} alt="userIcon"/>
                                </Link>
                            </li>
                        </div>
                    }
                    <li>
                        <Link href={"http://localhost:3000/cart"}>
                            <div class={"cartIcon"}>
                                <img className={"icon"} src={"/icons/cart.svg"} alt="cartIcon"/>
                                <p>
                                    ({cartDetails.totalQty})
                                </p>
                            </div>

                        </Link>

                        <div className={(miniCartToggle)?"showMiniCart":"hideMiniCart"}>
                            {cartDetails.products.map((product: Product) => (
                                <div className={"cartItemWrapper"} key={product.post_name}>
                                    <div className={"cartItem"}>
                                        <Link href={`http://localhost:3000/product/${product.post_name}`}>
                                            {product.post_name}
                                        </Link>
                                        <p className={"productPrice"}>{product.product_price}</p>
                                        <p>{product.product_quantity}x{product.product_price} = {Math.round((parseInt(product.product_price ) * product.product_quantity)*100)/100}</p>
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


            <div className={"underBranding"}>
                <ul className={"nav"}>
                    <li>
                        <Link href={"http://localhost:3000/product-category/hoodie"}>
                            Hoodies
                        </Link>
                    </li>
                    <li>
                        <Link href={"http://localhost:3000/product-category/tshirt"}>
                            shirts
                        </Link>
                    </li>
                </ul>
            </div>


        </div>

    )
}
