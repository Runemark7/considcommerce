import {useDispatch} from "react-redux";
import Link from "next/link";
import {logoutUser} from "./../../store/authSlice";
import {GetServerSidePropsContext} from "next";

const UserIndex = (data: any) => {
    const dispatch = useDispatch();

    return (
        <div>
            <ul>
                <li>
                    <a onClick={()=>{
                        const endpoint = "http://localhost:3000/api/auth/logout"

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
    const data = await res.json();

    return{
        props: {
            data
        }
    }
}

export default UserIndex
