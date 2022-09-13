import {useDispatch, useSelector} from "react-redux";
import {FormEvent} from "react";

const Login = () => {
    // @ts-ignore
    return(
        <div className={"cartWrapper"}>
            <form className={"formHolder"} method="post" onSubmit={(e)=>{
                handleLogin(e)
            }} >
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className={"inputField"} required/>

                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" className={"inputField"} required/>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    // @ts-ignore
    const data = {
        username: e.target.email.value,
        password: e.target.password.value,
    }

    const JSONdata = JSON.stringify(data);

    const endpoint = "http://localhost:5000/auth/account/login"

    const options = {
        method: 'POST',
        mode: "no-cors",
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSONdata
    }

    // @ts-ignore
    const response = await fetch(endpoint, options).then(resp=>{
        console.log(resp);
    }).then(data => console.log(data))

}

export default Login