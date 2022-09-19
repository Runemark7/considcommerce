import { useRouter } from 'next/router'
import {GetStaticPaths, GetStaticProps} from "next";

const PostLayout = (data:any) => {
    const router = useRouter()
    const { post } = router.query

    return (
        <div>
            product detail for: { post }
            <br/>
            from api: {data.productData}
        </div>
    );
}


//should move this to a middleware or anything like that, thunk or redux at least
export const getStaticProps: GetStaticProps = async ({params}) => {
    const data = await fetch(`http://127.0.0.1:5000/api/page/123`);
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

export default PostLayout
