import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className={"footerWrapper"}>
                <div className="footerBranding">
                    <div className={"footerLogo"}>
                        <img src={"/sitelogo.png"} alt="footerlogo"/>
                    </div>
                </div>

                <div className={"column"}>
                    <ul>
                        <li>
                            <Link href={"http://localhost:3000/about-us"}>
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href={"http://localhost:3000/about-us-two"}>
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link href={"http://localhost:3000/terms-of-service"}>
                                Terms of service
                            </Link>
                        </li>

                    </ul>
                </div>
                <div className={"column"}>
                    <ul>
                        <li>
                            <Link href={"http://localhost:3000/contact-us"}>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link href={"http://localhost:3000/shipping-terms"}>
                                Shipping Terms
                            </Link>
                        </li>
                        <li>
                            <Link href={"http://localhost:3000/gdpr"}>
                                GDPR rules
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            <hr className={"footerDivider"}/>

            <div className={"footerWrapper socials"}>
                socials
            </div>
        </footer>
    )
}
