import Product from "../models/Product";
import {useEffect, useState} from "react";
import AddToCart from "./elements/product/addToCart";
import Image from "next/image"
import Link from "next/link";


type Props = {
    product: Product,
    layout: String
}

const ProductListItem = (props: Props) => {
    const [product, setProduct] = useState<Product>(props.product);
    useEffect(()=>{
        setProduct(props.product)
    },[])


    if(props.layout == "list"){
        return (
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
            )
    }else if(props.layout == "single"){
        return (
            <div className={"productWrapper twocols sixty-fourty"} key={product.post_name}>
                <div className={"leftCol"}>
                    <Image
                        src={product.post_featuredImage}
                        width={859}
                        height={1163}
                    />
                </div>

                <div className={"rightCol smallPadding"}>
                    <div>
                        <h2 className={"noMarginTop"}>{product.post_name}</h2>
                        <p className={"productPrice"}>{product.product_price} SEK</p>
                        <p>{product.post_excerpt}</p>
                    </div>
                    <AddToCart product={product} />
                </div>
            </div>
        )
    }else{
        return (
            <div className={"productWrapper twocols sixty-fourty"} key={product.post_name}>
                <div className={"leftCol"}>
                    <Image
                        src={product.post_featuredImage}
                        width={859}
                        height={1163}
                    />
                </div>

                <div className={"rightCol smallPadding"}>
                    <div>
                        <h2 className={"noMarginTop"}>{product.post_name}</h2>
                        <p className={"productPrice"}>{product.product_price} SEK</p>
                        <p>{product.post_excerpt}</p>
                    </div>
                    <AddToCart product={product} />
                </div>
            </div>
        )
    }

}

export default ProductListItem
