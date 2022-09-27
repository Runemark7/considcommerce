import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import PostMeta from "../../models/PostMeta";

const ThankYouIndex = () => {
    const router = useRouter()
    const { orderid } = router.query

    // @ts-ignore
    const user = useSelector((state)=>(state.user))

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        if (!user.loggedIn) {
            router.push("/login")
        }else{
            const endpoint = `http://localhost:8010/proxy/user/order/${orderid}`

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
        <div className={"productWrapper"}>
            {(isLoading) ?
                <div>
                    loading...
                </div> :
                <div>
                    {(data) ?
                        <div>
                            <h3>Thank you for making a order!</h3>
                            <p className={"productTitle"}>Order: {data.postData.post_name}</p>
                            {data.postMeta.map((postMeta: PostMeta) => (
                                <div className={"productWrapper"} key={postMeta.meta_id}>
                                    <p className={"productTitle"}>{postMeta.meta_key}: {postMeta.meta_value}</p>
                                </div>
                            ))}
                        </div>
                        :<></>
                    }
                </div>
            }
        </div>
    );
}

export default ThankYouIndex
