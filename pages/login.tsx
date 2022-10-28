import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";

import {loginUser, selectAuthState} from "../store/authSlice";
import {useRouter} from "next/router";
import Link from "next/link";

const Login = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    // @ts-ignore
    const user = useSelector(selectAuthState)

    useEffect(()=>{
        if (user){
            router.push("/register")
        }
    },[user])

    const [error,setError] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            "username": e.target.email.value,
            "password": e.target.password.value,
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = "http://localhost:8010/proxy/auth/token"

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSONdata
        }

        await fetch(endpoint, options)
            .then(resp=>{
                if (resp.ok){
                    setError(false)
                    return resp.json()
                }else{
                    const error = new Error(resp.statusText)
                    throw error

                }
            })
            .then(data => {
                dispatch(loginUser(data))
            }).catch((error)=>{
                setError(true)
            })
    }

    return(
        <div className={"cartWrapper"}>
            <form className={"formHolder"} method="post" onSubmit={handleSubmit} >
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" className={`inputField ${(error)?"inputError":""} `} required/>

                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" className={`inputField ${(error)?"inputError":""}`} required/>

                {(error)?<p className={"errorText"}>Try again</p>:""}

                <button type="submit">Login</button>
            </form>
            <Link href={"http://localhost:3000/register"}>
                <a href="">
                    Register
                </a>
            </Link>
        </div>
    )
}

export default Login