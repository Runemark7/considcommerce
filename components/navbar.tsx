import Link from "next/link";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SearchBar from "./searchBar";


export default function Navbar() {
    const user = useSelector((state)=>(state.user))
    const cart = useSelector((state)=>(state.cart))

    const [cartDetails, setCartDetails] = useState(cart);

    useEffect(()=>{
        setCartDetails(cart)
    }, [cart.totalprice])

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
                <ul className={"userIcons"}>
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
                            <div className={"cartIcon"}>
                                <img className={"icon"} src={"/icons/cart.svg"} alt="cartIcon"/>
                                <p>
                                    ({cartDetails.totalQty})
                                </p>
                            </div>

                        </Link>
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
                    <li>
                        <Link href={"http://localhost:3000/product-category/sweatshirt"}>
                            Sweatshirts
                        </Link>
                    </li>
                </ul>
            </div>


        </div>

    )
}
