import {GetServerSidePropsContext} from "next";
import {FormEvent, useState} from "react";



const AdminEditUser = (props: any) => {

    console.log(props.userData)

    const [changedUserMeta, setChangeUserMeta] = useState(null);

    const handleSubmit = (e :FormEvent) => {
        e.preventDefault()

        if ( changedUserMeta){
            changedUserMeta["userId"] = props.userData.userId
        }


        console.log(changedUserMeta)

        const JSONdata = JSON.stringify(changedUserMeta);
        const endpoint = "http://localhost:3000/api/middleroutes/updateuser"
        const options = {
            method: 'POST',
            body: JSONdata,
        }

        fetch(endpoint, options)
            .then(resp=>{
            }).then(
            );
    }

    const handleChangeUserMeta = (e: FormEvent) =>{
        const name = e.target.name;
        const value = e.target.value;
        // @ts-ignore
        setChangeUserMeta({...changedUserMeta, [name]: value})
    }


    return (
        <div>
            <form onSubmit={(e:FormEvent)=>{
                handleSubmit(e)
            }}>
                <label htmlFor="userEmail">userEmail:</label>
                <input type="text" name={"userEmail"} defaultValue={props.userData.userEmail}  onChange={handleChangeUserMeta}/>

                <label htmlFor="userName">userName:</label>
                <input type="text" name={"userName"} defaultValue={props.userData.userName} onChange={handleChangeUserMeta} />

                <label htmlFor="userRole">userRole:</label>
                <select name="userRole" onChange={handleChangeUserMeta} >
                    <option value="1" defaultChecked={(props.userData.userRole == "1")}>User</option>
                    <option value="9" defaultChecked={(props.userData.userRole) == "9"}>Administrator</option>
                </select>

                <label htmlFor="userStatus">userStatus:</label>
                <input type="text" name={"userStatus"} defaultValue={props.userData.userStatus} onChange={handleChangeUserMeta} />

                <input type="submit"/>
            </form>

        </div>
    );
}










export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const userid = context.params?.userid;
    const endpoint = `http://localhost:8010/proxy/user/get/${userid}`

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const userData = await res?.json();

    return {
        props: {
            userData
        }
    }
}

export default AdminEditUser

