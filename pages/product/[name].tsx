import {GetStaticPaths, GetStaticProps} from "next";
import AddToCart from "../../components/elements/product/addToCart";
import Image from "next/image"

const ProductDetail = (data:any) => {
    return (
        <div className={"productWrapper twocols sixty-fourty"} key={data.productData.post_name}>
            <div className={"leftCol"}>
                <Image
                    src={data.productData.post_featuredImage}
                    width={859}
                    height={1163}
                />
            </div>

            <div className={"rightCol smallPadding"}>
                <div>
                    <h2 className={"noMarginTop"}>{data.productData.post_name}</h2>
                    <p className={"productPrice"}>{data.productData.product_price} SEK</p>
                    <p>{data.productData.post_excerpt}</p>
                </div>
                <AddToCart product={data.productData} />
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params.name;
    const endpoint = `http://localhost:8010/proxy/api/post/slug/${slug}`
    const data = await fetch(endpoint);
    const productData = await data.json();
    return {
        props: {
            productData,
        },
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default ProductDetail


