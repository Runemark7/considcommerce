import {GetServerSidePropsContext} from "next";
import ProductListItem from "../../components/productListItem";


const ProductDetail = (data:any) => {
    return (
        <ProductListItem product={data.productData} layout={"single"}/>
    )
}


export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const name = context.params?.name;
    const endpoint = `http://localhost:8010/proxy/api/post/slug/${name}`

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const productData = await res?.json();

    return{
        props: {
            productData,
        },
   }
}

export default ProductDetail


