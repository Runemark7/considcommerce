import {useEffect, useState} from "react";
import PageEditorClear from "../components/editor/PageEditorClear";
import { fetchData } from "../core/fetchDataHelper";
import Image from "next/image"
import Link from "next/link";
import ProductList from "../components/ProductList";

const Home = () => {
    const [postData, setPostData] = useState([])

    useEffect(()=>{
        async function getSlug(){
            await fetchData({
                body: undefined,
                endpoint: "/api/admin/settings/homeSlugPostUrl",
                headers: "",
                method: "GET",
                token: ""}
            ).then((data)=>{
                fetchData({
                    body: undefined,
                    endpoint: `/api/post/slug/${data.option_value}`,
                    headers: "",
                    method: "GET",
                    token: ""}
                ).then((postData) => {
                    setPostData(postData)
                })
            })
        }

        getSlug()
    }, [])

    return(
        <div className={"homeWrapper"}>
            {(postData.post_content)
                ?
                <div>
                    <PageEditorClear postId={postData.post_id} postContent={postData.post_content} />
                    <div className={"bannerSection"}>

                        <figure className={"bannerDesktop"}>
                            <Image
                                src={"/banner-desktop-2.jpg"}
                                width={859}
                                height={1163}
                                alt={""}
                            />
                        </figure>
                        <figure className={"bannerMobile"}>
                            <Image
                                src={"/banner-mobile-2.jpg"}
                                width={859}
                                height={1163}
                                alt={""}
                            />
                        </figure>
                    </div>

                    <div className="categoryBlockWrapper ">
                        <section className={"splitContent grayBackground"}>
                            <div className={"splitContentItem content"}>
                                <h2>REA</h2>
                                <p>
                                    Kolla in vår REA
                                </p>
                                <Link href={"/product-category/hoodie"} className={"underLineLink"}>
                                    Shoppa Rean ->
                                </Link>
                            </div>

                            <div className={"splitContentItem content"}>
                                <Image
                                    src={"/REAbanner-1024x614.jpg"}
                                    width={859}
                                    height={1163}
                                    alt={""}
                                />
                            </div>

                        </section>

                        <div className={"regularPadding"}>
                            <ProductList posttype={"product"} category={"hoodie"} layout={"list"} filter={"none"}/>
                        </div>
                    </div>

                    <div className="categoryBlockWrapper">
                        <section className={"splitContent blackGrayBackground"}>
                            <div className={"splitContentItem content"}>
                                <h2>Nyheter</h2>
                                <p>
                                    Upptäck den nya kollektionen
                                </p>
                                <Link href={"/product-category/sweatshirt"} className={"underLineLink"}>
                                    Shoppa Nyheter ->
                                </Link>
                            </div>

                            <div className={"splitContentItem content"}>
                                <Image
                                    src={"/Nyheterbanner-1024x614.jpg"}
                                    width={859}
                                    height={1163}
                                    alt={""}
                                />
                            </div>

                        </section>
                        <div className={"blackBlackBackground regularPadding"}>
                            <ProductList posttype={"product"} category={"sweatshirt"} layout={"list"} filter={"none"}/>
                        </div>
                    </div>

                    </div>


                :
                <></>
            }
        </div>
    )
}

export default Home
