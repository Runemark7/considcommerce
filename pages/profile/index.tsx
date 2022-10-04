import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Post from "../../models/Post";
import Link from "next/link";

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

    return (
        <div>
            {(isLoading)?
                <div>Loading...</div>
                :
                <div>
                    {(data)?data.map((order: Post) => (
                        <div className={"cartItemWrapper"} key={order.post_id}>
                            <Link href={`http://localhost:3000/profile/order/${order.post_id}`}>
                                <div>
                                    <h3 className={"productTitle"}>{order.post_name}</h3>
                                </div>
                            </Link>
                        </div>
                    )):<></>}
                </div>
            }
        </div>
    );
}

export default UserProfile
