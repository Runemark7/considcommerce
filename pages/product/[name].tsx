import { useRouter } from 'next/router'
import {GetStaticPaths, GetStaticProps} from "next";

const ProductDetail = (data:any) => {
    const router = useRouter()

    return (
        <div>
            {data.productData.name}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const endpoint = `http://localhost:8010/proxy/api/post/${params}`
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


