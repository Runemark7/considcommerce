import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Post from "../../../models/Post";
import Link from "next/link";
import Order from "../../../models/order";

const UserProfile = () => {

    // @ts-ignore
    const user = useSelector((state)=>(state.user))
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

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
                .then(resp=>resp.json())
                .then(data => {
                    setLoading(false)
                    setData(data)
                })
        }
    }, [user])

    console.log(data)

    return (
        <div>

            <ul>
                <li>
                    <Link href={"http://localhost:3000/profile/order"}>
                        <a href="pages/profile/order/index">Orders</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/profile/settings"}>
                        <a href="pages/profile/order/index">Settings</a>
                    </Link>

                </li>
            </ul>
            {(isLoading)?
                <div>Loading...</div>
                :
                <div>
                    {(data.length > 0)?data.map((order: Order) => (
                        <div className={"cartItemWrapper"} key={order.post_id}>
                            <Link href={`http://localhost:3000/profile/order/${order.post_id}`}>
                                <div className={"twocols"}>
                                    <p>
                                        {order.post_name}
                                    </p>
                                    <p>
                                        {order.orderStatus}
                                    </p>
                                    <p>
                                        {order.post_id}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )):<div>
                        No orders found!
                    </div>}
                </div>
            }
        </div>
    );
}

export default UserProfile
