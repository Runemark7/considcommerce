import Link from "next/link";

export default function AdminNavbar() {
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
