import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Post from "../../models/Post";

const UserProfile = () => {

    // @ts-ignore
    const user = useSelector((state)=>(state.user))
    const router = useRouter();
    const [data, setData] = useState(null);
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
                    setData(data)
                    setLoading(false)
                })
        }
    }, [user])

    console.log(data)

    return (
        <div>
            {(data)?data.map((order: Post) => (
                <div className={"cartItemWrapper"} key={order.post_id}>
                    <h3 className={"productTitle"}>{order.post_name}</h3>
                </div>
            )):<div>
                loading
            </div>}
            profile
        </div>
    );
}

export default UserProfile
