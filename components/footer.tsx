import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div>
                <div className={"column"}>
                    <ul>
                        <li>
                            <Link href={"http://localhost:3000/about-us"}>
                                about us
                            </Link>
                        </li>
                        <li>
                            <Link href={"http://localhost:3000/about-us-two"}>
                                about us two
                            </Link>
                        </li>
                        <li>
                            Link 1
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
