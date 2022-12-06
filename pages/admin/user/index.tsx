import type {GetServerSidePropsContext, NextPage} from 'next'
import {FormEvent} from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";

const AdminUserList: NextPage = (props:any) => {
    const createUser = (e :FormEvent) => {
        e.preventDefault()

        const endpoint = "http://localhost:3000/api/middleroutes/createuser"

        const payload = {
            "userPassword": e.target.userPassword.value,
            "userName":e.target.userName.value,
            "userRole":e.target.userRole.value
        }

        const JSONdata = JSON.stringify(payload);

        const options = {
            method: 'POST',
            body:JSONdata
        }
        fetch(endpoint, options)
            .then((resp)=>{
            })
            .then(msg => {
            });
    }

    return (
        <div>
            <h1>Users</h1>

            <form onSubmit={createUser}>
                <label htmlFor="userName">userName*</label>
                <input type={"text"} name="userName" required={true}  />

                <label htmlFor="userPassword">userPassword*</label>
                <input type={"password"} name="userPassword" required={true}/>

                <label htmlFor="userRole">userRole*</label>
                <select name="userRole">
                    <option value="1">User</option>
                    <option value="9">Administrator</option>
                </select>

                <input type="submit" value={"Create user"}/>
            </form>

            <DataTable
                columns={[
                    {
                        name: "Username",
                        selector: ({userName}) => userName,
                        sortable: true
                    },
                    {
                        name: "Usermail",
                        selector: ({userEmail}) => userEmail
                    },
                    {
                        name: "Userrole",
                        selector: ({userRole}) => (userRole=="9")?"Admin":"User",
                        sortable: true
                    },
                    {
                        name: "Userstatus",
                        selector: ({userStatus}) => userStatus,
                        sortable: true
                    },
                    {
                        cell: ({userId}, index, column, id) => {
                            return (
                                <Link href={`http://localhost:3000/admin/user/${userId}`}>
                                    <button>
                                        Change
                                    </button>
                                </Link>
                            )
                        }
                    }
                ]}
                pagination={true}
                data={props.data}
                highlightOnHover={true}
                striped={true}
                pointerOnHover={true} />

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
