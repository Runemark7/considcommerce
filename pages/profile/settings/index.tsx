import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import UserShowObj from "../../../models/userShowObj";

const UserSettings = () => {
    // @ts-ignore
    const user = useSelector((state)=>(state.user))
    const router = useRouter();
    const [data, setData] = useState<UserShowObj>();
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        if (!user.loggedIn) {
            router.push("/login")
        }else{
            const endpoint = "http://localhost:8010/proxy/user/data"

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

            <ul>
                <li>
                    <Link href={"http://localhost:3000/profile/order"}>
                        <a href="">Orders</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/profile/settings"}>
                        <a href="">Settings</a>
                    </Link>

                </li>
            </ul>
            {(isLoading)?
                <div>Loading...</div>
                :
                <div>
                    {(data)?
                        <div className={"cartItemWrapper"} >
                            <div >
                                <p>
                                    Username: {data.userName}
                                </p>
                                <p>
                                    Email: {data.userEmail}
                                </p>
                                <p>
                                    Role: {(data.userRole==1)?"Customer":"Admin"}
                                </p>
                                <p>
                                    Status: {data.userStatus}
                                </p>
                            </div>
                        </div>
                    :<div>
                        No orders found!
                    </div>}
                </div>
            }
        </div>
    );
}

export default UserSettings
