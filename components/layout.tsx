import Navbar from './navbar'
import Footer from './footer'
import AdminNavbar from "./adminNavbar";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


export default function Layout({ children }:any) {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false);


    if(router.pathname.startsWith("/admin")){
        useEffect(()=>{
            const endpoint = "http://localhost:3000/api/auth/admin"

            const options = {
                method: 'GET',
            }

            fetch(endpoint, options)
                .then(resp=>    {
                    if (resp.ok){
                        setIsAdmin(true)
                    }
                })
        },[])
    }

    return (
        (isAdmin)?
            <>
                <div className="adminPage">
                    <AdminNavbar />
                    <main>{children}</main>
                </div>
            </>
            :
            <div>
                <Navbar />
                    <main>
                        <div className={"pageWrapper"}>
                            {children}
                        </div>
                    </main>
                <Footer />
            </div>
    )
}


