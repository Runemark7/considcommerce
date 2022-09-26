import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Post from "../../../models/Post";
import {useRouter} from "next/router";

const AdminPages: NextPage = (data:any) => {
    const router = useRouter()
    const { type } = router.query
    return (
        <div>
            <Link href={`http://localhost:3000/admin/posttype/${type}/post/create`}>
                <button>Create post</button>
            </Link>

            {data.posts.map((post: Post) => (
                <div className={"productWrapper"} key={post.post_id}>
                    <Link href={`http://localhost:3000/admin/posttype/${type}/update/${post.post_id}`}>
                        <button>show {type}</button>
                    </Link>
                    <div>
                        <p className={"productTitle"}>name: {post.post_name}</p>
                        <p className={"productPrice"}>id: {post.post_id}</p>
                        <p className={"productPrice"}>status: {post.post_status}</p>
                    </div>
                </div>
            ))}
            Pages edit
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    // @ts-ignore
    const type = params.type;
    const data = await fetch(`http://localhost:8010/proxy/api/posttype/${type}`);
    const posts = await data.json();
    return {
        props: {
            posts,
        },
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export default AdminPages
