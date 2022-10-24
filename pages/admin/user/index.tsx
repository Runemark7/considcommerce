import type { NextPage } from 'next'
import {FormEvent, useEffect, useState} from "react";
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

    const createUser = (e :FormEvent) => {
        e.preventDefault()

        const endpoint = "http://localhost:8010/proxy/user/createUser"

        const payload = {
            "userPassword": e.target.userPassword.value,
            "userName":e.target.userName.value,
            "userRole":e.target.userRole.value
        }

        const JSONdata = JSON.stringify(payload);

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + user.jwtToken,
            },
            body:JSONdata
        }
        fetch(endpoint, options)
            .then((resp)=>{
                if (resp.status == 201){
                    return resp.json()
                }
            })
            .then(msg => {
                console.log(msg)
            });
    }

    return (
        <div>

            <form onSubmit={createUser}>
                <label htmlFor="userName">userName*</label>
                <input type={"text"} name="userName" required={true}/>

                <label htmlFor="userPassword">userPassword*</label>
                <input type={"password"} name="userPassword" required={true}/>

                <select name="userRole">
                    <option value="1">User</option>
                    <option value="9">Administrator</option>
                </select>

                <input type="submit"/>
            </form>

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
