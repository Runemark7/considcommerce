import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../store/authSlice";

export default function Navbar() {
    const user = useSelector((state)=>(state.user))

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
            </ul>
        </div>
    )
}
