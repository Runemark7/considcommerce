import Link from "next/link";

export default function Navbar() {
    return (
        <div className={"mainNavBar"}>
            <div className={"companyBranding"}>
                <Link href={"http://localhost:3000"}>
                    <p>
                        logo
                    </p>
                </Link>
            </div>

            <ul className={"nav"}>
                <li>
                    <Link href={"http://localhost:3000/product"}>
                        <a>shop</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/cart"}>
                        <a>Cart</a>
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/checkout"}>
                        <a>Checkout</a>
                    </Link>
                </li>
            </ul>
        </div>

    )
}
