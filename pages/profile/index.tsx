import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

const UserIndex = () => {

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
