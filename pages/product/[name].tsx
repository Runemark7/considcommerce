import { useRouter } from 'next/router'
import {GetStaticPaths, GetStaticProps} from "next";

const ProductDetail = (data:any) => {
    const router = useRouter()
    const { name } = router.query
    console.log(data);

    return (
        <div>
            product detail for: { name }
            <br/>
            from api: {data.productData.name}
        </div>
    );
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const data = await fetch(`http://localhost:3000/api/product/${params}`);
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