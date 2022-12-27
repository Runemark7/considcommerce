import {useDispatch} from "react-redux";
import Link from "next/link";
import {logoutUser} from "./../../store/authSlice";
import {GetServerSidePropsContext} from "next";
import {useRouter} from "next/router";
import {clearAllItemsInCart} from "../../store/cartSlice";

const UserIndex = (data: any) => {
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <div>
            <ul>
                <li>
                    <a onClick={()=>{
                        const endpoint = "http://localhost:3000/api/auth/logout"

                        const options = {
                            method: 'GET',
                        }

                        // @ts-ignore
                        fetch(endpoint, options)
                            .then(resp => {
                                dispatch(logoutUser())
                                dispatch(clearAllItemsInCart())
                                router.push("/login")
                            })}}
                    >Logout</a>
                </li>
                <li>
                    <Link href={"http://localhost:3000/profile/order"}>
                        Orders
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/profile/settings"}>
                        Settings
                    </Link>

                </li>
            </ul>
            Index
        </div>
    );
}

export const getServerSideProps = async (context :GetServerSidePropsContext) => {
    const endpoint = "http://localhost:8010/proxy/user/orders"

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);

    if (res.ok){
        const data = await res?.json();
        return{
            props: {
                data
            }
        }
    }else{
        return{
            props: {
                data: []
            }
        }
    }
}

export default UserIndex
