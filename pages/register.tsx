import {FormEvent, useEffect, useState} from "react";

import {useRouter} from "next/router";

const Register = () => {
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(e.target.passwordFirst.value == e.target.passwordAgain.value){
            setPasswordMatch(false)

            const data = {
                "userPassword": e.target.passwordFirst.value,
                "userName": e.target.userName.value,
                "userEmail": e.target.userEmail.value,
            }

            const JSONdata = JSON.stringify(data);

            const endpoint = "http://localhost:8010/proxy/user/create/customer"

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSONdata
            }

            await fetch(endpoint, options)
                .then(resp=>{
                    if(resp.ok){
                        return resp.json()
                    }
                }).then(data => {
                })

        }else{
            setPasswordMatch(true)
        }
    }


    return(
        <div className={"cartWrapper"}>
            <form className={"formHolder"} method="post" onSubmit={handleSubmit} >
                <label htmlFor="userName">Username*</label>
                <input type="text" name="userName" id="userName" className={"inputField"} required/>

                <label htmlFor="userEmail">Email*</label>
                <input type="email" name="userEmail" id="userEmail" className={"inputField"} required/>

                {(passwordMatch)?
                    <div>
                        Passwords dont match
                    </div>
                    :
                <></>}

                <label htmlFor="passwordFirst">password*</label>
                <input type="password" name="passwordFirst" id="password" className={"inputField"} required/>

                <label htmlFor="passwordAgain">passwordAgain*</label>
                <input type="passwordAgain" name="passwordAgain" id="password" className={"inputField"} required/>

                <input type="submit"/>
            </form>
        </div>
    )
}

export default Register
