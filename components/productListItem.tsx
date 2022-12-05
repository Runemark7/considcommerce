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
    },[props])


    if(props.layout == "list"){
        return (
            <div className={"productWrapper componentWrapper"} key={product.post_name}>
                <Link href={`http://localhost:3000/product/${product.post_slug}`}>
                    <div>
                        <Image
                            src={product.post_featuredImage}
                            width={859}
                            height={1163}
                            alt={""}
                        />


                        <div>
                            <h4 className={"productTitle"}>{product.post_name}</h4>
                            <p className={"productPrice"}>{product.product_price} SEK</p>
                        </div>
                    </div>
                </Link>

                <AddToCart product={product} />
            </div>
            )
    }else if(props.layout == "single"){
        return (
            <div className={"productWrapper componentWrapper twocols sixty-fourty"} key={product.post_name}>
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
    }else if(props.layout == "checkout"){
        return (
            <div className={"productWrapper"} key={product.post_name}>
                <div>
                    <p>{product.post_name}</p>
                    <p>{product.product_price} SEK</p>
                    <p>{product.product_price}*{product.product_quantity} = {parseInt(product.product_price)*(product.product_quantity)} SEK</p>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className={"productWrapper componentWrapper twocols sixty-fourty"} key={product.post_name}>
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
