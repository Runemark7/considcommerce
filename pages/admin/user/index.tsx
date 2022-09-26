import type { NextPage } from 'next'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const AdminUserList: NextPage = () => {
    const user = useSelector((state)=>(state.user))

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);

        const endpoint = "http://localhost:8010/proxy/get/users"

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
    }, [user])

    return (
        <div>
            {(data)?data.map((user: any) => (
                <div className={"cartItemWrapper"} key={user.id}>
                    <h3 className={"productTitle"}>{user.name}</h3>
                </div>
            )):<div>
                loading
            </div>}
        </div>

    )
}

export default AdminUserList
