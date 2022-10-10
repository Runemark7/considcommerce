import {GetServerSideProps} from "next";
import Link from "next/link";
import AddToCart from "../../components/elements/product/addToCart";
import Image from "next/image"
import Product from "../../models/Product";

const ProductListing = (data :any) => {

    return (
        <div className={"productListWrapper"}>
            {data.products.map((product: Product) => (
                <div className={"productWrapper"} key={product.post_name}>
                    <Image
                        src={product.post_featuredImage}
                        width={859}
                        height={1163}
                                      />

                    <Link href={`http://localhost:3000/product/${product.post_slug}`}>
                        <div>
                            <h4 className={"productTitle"}>{product.post_name}</h4>
                            <p className={"productPrice"}>{product.product_price} SEK</p>
                        </div>
                    </Link>
                    <AddToCart product={product} />
                </div>
            ))}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const endpoint = "http://localhost:8010/proxy/api/posttype/product"

    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }

    const data = await fetch(endpoint, options);
    const products = await data.json();
    return {
        props: {
            products,
        },
    }
    /*
    try{
        // @ts-ignore
        const {products, errors} = await fetch(endpoint, options);
        if (errors || !products){
            return {
                notFound: true
            }
        }
        return {
            props: {
                products
            }
        }
    }catch{
        return {
            notFound: true
        };
    }*/
}

export default ProductListing
