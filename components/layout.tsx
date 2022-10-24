import Navbar from './navbar'
import Footer from './footer'

import { useRouter } from 'next/router'
import AdminNavbar from "./adminNavbar";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export default function Layout({ children }) {
    const router = useRouter()



    if(router.pathname.startsWith("/admin")){
        const [isAdmin, setIsAdmin] = useState(false);
        // @ts-ignore
        const user = useSelector((state)=>(state.user))

        useEffect(()=>{
            const endpoint = "http://localhost:8010/proxy/auth/token/admin"

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + user.jwtToken,
                },
            }

            fetch(endpoint, options)
                .then(resp=>resp.json())
                .then(data => {
                    if (data["auth"]){
                        setIsAdmin(true)
                    }else{
                        setIsAdmin(false)
                    }
                })

        },[user])

        if(isAdmin){
            return(
                <>
                    <div className="adminPage">
                        <AdminNavbar />
                        <main>{children}</main>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <Navbar />
                <main>
                    <div className={"pageWrapper"}>
                        {children}
                    </div>
                </main>
            <Footer />
        </>
    )
}