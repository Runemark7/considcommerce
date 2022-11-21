import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import cookie from "js-cookie"

import {logoutUser} from "./../../store/authSlice";

const UserIndex = () => {

    // @ts-ignore
    const user = useSelector((state)=>(state.user))
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{

        setLoading(true);
        if (!user.loggedIn) {
            router.push("/login")
        }else{
            const endpoint = "http://localhost:8010/proxy/user/orders"

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + user.jwtToken,
                },
            }

            fetch(endpoint, options)
                .then(resp=>{
                    if(resp.ok){
                        resp.json()
                    }
                })
                .then(data => {
                    setLoading(false)
                    setData(data)
                })
        }
    }, [user])


    return (
        <div>
            <ul>
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
                                cookie.remove("jwtToken")
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

export default UserIndex
