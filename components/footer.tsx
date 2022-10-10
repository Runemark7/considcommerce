import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div>
                <div className={"column"}>
                    <ul>
                        <li>
                            <Link href={"http://localhost:3000/about-us"}>
                                <a>about us</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"http://localhost:3000/about-us-two"}>
                                <a>about us two</a>
                            </Link>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={"column"}>
                    <ul>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Link 1
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
