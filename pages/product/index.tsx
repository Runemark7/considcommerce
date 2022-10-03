import { GetStaticProps } from "next";
import Link from "next/link";
import AddToCart from "../../components/elements/product/addToCart";
import Product from "../../models/Product";
import Image from "next/image"
import mypic from "/public/IMG_5552.jpg"


const ProductListing = (data: any) => {
    return (
        <div className={"productListWrapper"}>
            {data.products.map((product: Product) => (
                <div className={"productWrapper"} key={product.title}>
                    <Image
                        src={mypic}
                    />

                    <Link href={`http://localhost:3000/product/${product.title}`}>
                        <div>
                            <h4 className={"productTitle"}>{product.title}</h4>
                            <p className={"productPrice"}>{product.price} SEK</p>
                        </div>
                    </Link>
                    <AddToCart product={product} />
                </div>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const endpoint = "http://localhost:8010/proxy/api/posttype/product"
    const data = await fetch(endpoint);
    const products = await data.json();
    return {
        props: {
            products,
        },
    }
}

export default ProductListing
