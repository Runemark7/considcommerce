import { GetStaticProps } from "next";
import Link from "next/link";
import AddToCart from "../../components/elements/product/addToCart";
import Product from "../../models/Product";

const ProductListing = (data:any) => {
    return (
        <div className={"productListWrapper"}>
            {data.Products.products.map((product: Product) => (
                <div className={"productWrapper"} key={product.title}>
                    <Link href={`http://localhost:3000/product/${product.title}`}>
                        <div>
                            <h3 className={"productTitle"}>{product.title}</h3>
                            <p className={"productPrice"}>{product.price}</p>
                        </div>
                    </Link>
                    <AddToCart product={product} />
                </div>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const data = await fetch(`http://localhost:3000/api/product`);
    const Products = await data.json();
    return {
        props: {
            Products,
        },
    }
}

export default ProductListing
