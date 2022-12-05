import {useSelector} from "react-redux";
import {FormEvent} from "react";
import Link from "next/link";
import {GetServerSidePropsContext} from "next";

const UserSettings = (props: any) => {
    // @ts-ignore
    const user = useSelector((state)=>(state.user))

    const submitPasswordChanges = (e: FormEvent) => {

        //TODO: Change this to the local api and user the right headers!!!
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
        <div className={"componentWrapper"}>
            <ul>
                <li>
                    <Link href={"http://localhost:3000/profile/order"}>
                        Orders
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/profile/settings"}>
                        Settings
                    </Link>

                </li>
            </ul>
            <div>
                <div>
                    {(props.data)?
                        <div className={"cartItemWrapper"} >
                            <div >
                                <p>
                                    Username: {props.data.userName}
                                </p>
                                <p>
                                    Email: {props.data.userEmail}
                                </p>
                                <p>
                                    Role: {(props.data.userRole==1)?"Customer":"Admin"}
                                </p>
                                <p>
                                    Status: {props.data.userStatus}
                                </p>
                            </div>
                        </div>
                        :<div>
                            info not found!
                        </div>}
                </div>

                <h3>Update password</h3>
                    <form onSubmit={submitPasswordChanges}>
                        <label htmlFor={"passwordBefore"}>Old password</label>
                        <input type="password" name={"passwordBefore"}/>

                        <label htmlFor="newPassword">New password</label>
                        <input type="password" name={"newPassword"}/>

                        <label htmlFor="newPasswordAgain">New password again</label>
                        <input type="password" name={"newPasswordAgain"}/>

                        <br/>
                        <input type="submit" value={"Change Password"}/>
                    </form>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context :GetServerSidePropsContext) => {
    const endpoint = "http://localhost:8010/proxy/user/data"

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const data = await res.json();

    return{
        props: {
            data
        }
    }
}

export default UserSettings
