import type {GetServerSidePropsContext, NextPage} from 'next'
import {FormEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";

const AdminUserList: NextPage = (props:any) => {
    const user = useSelector((state)=>(state.user))

    const [createUserMsg, setCreateUserMsg] = useState("");

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
                setCreateUserMsg(msg)
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

            {(props.data)?props.data.map((user: any) => (
                <div className={"cartItemWrapper"} key={user.userId}>
                    <p className={"productTitle"}>
                        {user.userName}
                        <br/>
                        {user.userEmail}
                        <br/>
                        {user.userRole}
                        <br/>
                        {user.userStatus}
                    </p>
                </div>
            )):<div>
                loading
            </div>}
        </div>

    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const endpoint = "http://localhost:8010/proxy/get/users"

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const data = await res?.json();

    return {
        props: {
            data
        }
    }
}

export default AdminUserList
