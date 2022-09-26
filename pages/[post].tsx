import { useRouter } from 'next/router'
import {GetStaticPaths, GetStaticProps} from "next";

const PostLayout = (data:any) => {
    const router = useRouter()
    const { post } = router.query

    return (
        <div>
            product detail for: { post }
            <br/>
            from api: {data.pageData}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const endpoint = `http://localhost:8010/proxy/api/post/${params}`
    const data = await fetch(endpoint);
    const pageData = await data.json();
    return {
        props: {
            pageData,
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
