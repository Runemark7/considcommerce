import {useDispatch} from "react-redux";
import {FormEvent, useState} from "react";

import {loginUser} from "../store/authSlice";
import Link from "next/link";

const Login = () => {
    const dispatch = useDispatch();
    const [error,setError] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            "username": e.target.email.value,
            "password": e.target.password.value,
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = "http://localhost:3000/api/auth/login"
        const options = {
            method: 'POST',
            body: JSONdata
        }

        fetch(endpoint, options)
            .then(resp=>{
                if (resp.ok){
                    setError(false)
                    return resp.json()
                }else{
                    throw resp.statusText
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

                {(error)
                    ?
                    <p className={"errorText"}>Try again</p>
                    :
                    ""
                }

                <button type="submit">Login</button>
            </form>
            <Link href={"http://localhost:3000/register"}>
                Register
            </Link>
        </div>
    )
}

export default Login