import Link from "next/link";
import {useEffect, useState} from "react";


export default function AdminNavbar() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const options = {
        method: 'GET',
        mode: "no-cors",
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*",
            "Access-Control-Allow-Origin": "*"
        },
    }

    useEffect(()=>{
        setLoading(true)
        fetch('http://localhost:5000/api/posttypes', options)
            .then((res)=>{
                console.log(res)
            })
            .then((data)=>{
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    console.log(data);

    return (
        <div className={"mainNavBar"}>
            <div className={"companyBranding"}>
                <Link href={"http://localhost:3000/admin"}>
                    <p>
                        logo
                    </p>
                </Link>
            </div>

            <ul className={"nav"}>
                <li>
                    <Link href={"http://localhost:3000/admin/post/create"}>
                        <a>Create post</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/admin/pages"}>
                        <a>Pages</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/admin/cart"}>
                        <a>Products</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/admin/checkout"}>
                        <a>Settings</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/admin/login"}>
                        <a>Account</a>
                    </Link>
                </li>
            </ul>
        </div>

    )
}
