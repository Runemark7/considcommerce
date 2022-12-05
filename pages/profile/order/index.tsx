import Link from "next/link";
import Order from "../../../models/order";
import {GetServerSidePropsContext} from "next";
import {Simulate} from "react-dom/test-utils";

const UserProfile = (props: any) => {
    return (
        <div>
            <ul>
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
            <div>
                {(props.data)?props.data.map((order: Order) => (
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
    const data = await res?.json();

    return{
        props: {
            data
        }
    }
}

export default UserProfile
