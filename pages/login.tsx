import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useEffect} from "react";

import {loginUser, selectAuthState} from "../store/authSlice";
import {useRouter} from "next/router";

const Login = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    // @ts-ignore
    const user = useSelector(selectAuthState)

    useEffect(()=>{
        if (user){
            router.push("/")
        }
    },[user])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            username: e.target.email.value,
            password: e.target.password.value,
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = "http://localhost:8010/proxy/auth/token"

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }

        await fetch(endpoint, options)
            .then(resp=>resp.json())
            .then(data => {
                console.log(data)
                dispatch(loginUser(data))
            })
    }

    return(
        <div className={"cartWrapper"}>
            <form className={"formHolder"} method="post" onSubmit={handleSubmit} >
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" className={"inputField"} required/>

                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" className={"inputField"} required/>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login