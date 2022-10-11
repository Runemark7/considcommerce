import {GetStaticPaths, GetStaticProps} from "next";
import ProductListItem from "../../components/productListItem";

const ProductDetail = (data:any) => {
    return (
        <ProductListItem product={data.productData} layout={"single"}/>
    )
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


