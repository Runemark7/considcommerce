import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
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


    const submitPasswordChanges = (e: FormEvent) => {
        e.preventDefault()

        const formData = {
            oldPass: e.target.passwordBefore.value,
            newPass: e.target.newPassword.value,
        }

        const fromFormDataToJSON = JSON.stringify(formData);

        const endpoint = "http://localhost:8010/proxy/user/update/password"

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwtToken,
            },
            body: fromFormDataToJSON
        }

        fetch(endpoint, options)
            .then(resp=>{
                if (resp.ok){
                    return resp.json()
                }
            })
            .then(data => {
                console.log(data)
            })

    }

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
            <div>
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

                <h3>
                    Update password
                    <form onSubmit={submitPasswordChanges}>
                        <label htmlFor={"passwordBefore"}>Old password</label>
                        <input type="password" name={"passwordBefore"}/>

                        <label htmlFor="newPassword">New password</label>
                        <input type="password" name={"newPassword"}/>

                        <label htmlFor="newPasswordAgain">New password again</label>
                        <input type="password" name={"newPasswordAgain"}/>

                        <input type="submit"/>
                    </form>
                </h3>

            </div>

        </div>
    );
}

export default UserSettings
