import Navbar from './navbar'
import Footer from './footer'

import { useRouter } from 'next/router'
import AdminNavbar from "./adminNavbar";


export default function Layout({ children }) {
    const router = useRouter()

    if(router.pathname.startsWith("/admin")){
        return(
            <>
                <AdminNavbar />
                    <main>{children}</main>
            </>
        )
    }

    return (
        <>
            <Navbar />
                <main>{children}</main>
            <Footer />
        </>
    )
}