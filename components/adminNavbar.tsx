import Link from "next/link";
import {useEffect, useState} from "react";
import PostType from "../models/PostType";

export default function AdminNavbar() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [showSubMenu, setShowMenu] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch('http://localhost:8010/proxy/api/posttypes')
            .then((res)=>res.json())
            .then((data)=>{
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div className={"adminMainNavBar"}>
            <ul className={"zeroLevelNav"}>
                <li className={"zeroLevelLi"} >
                    <Link href={"http://localhost:3000"}>
                        <p>
                            Home
                        </p>
                    </Link>
                </li>

                {data.map((posttype: PostType) => (
                    <li className={"zeroLevelLi"} key={posttype.posttype_id}>
                        <a>{posttype.posttype_name}</a>
                        <ul className={ "subMenu" }>
                            <li>
                                <Link href={`http://localhost:3000/admin/posttype/${posttype.posttype_name}`}>
                                    <a>All {posttype.posttype_name}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`http://localhost:3000/admin/posttype/${posttype.posttype_name}/create`}>
                                    <a>Create {posttype.posttype_name}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`http://localhost:3000/admin/posttype/${posttype.posttype_name}/categories`}>
                                    <a>Categories</a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                ))}
                <li className={"zeroLevelLi"} >
                    <Link href={"http://localhost:3000/admin/posttype/create"}>
                        <a>Create posttype</a>
                    </Link>
                </li>
                <li className={"zeroLevelLi"} >
                    <Link href={"http://localhost:3000/admin/user"}>
                        <a>Users</a>
                    </Link>
                </li>
            </ul>
        </div>

    )
}
