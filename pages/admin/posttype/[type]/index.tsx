import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {useRouter} from "next/router";
import Link from "next/link";
import Post from "../../../../models/Post";
import {Exception} from "sass";

const PosttypeIndex: NextPage = (data:any) => {
    const router = useRouter()
    const { type } = router.query

    return (
        <div>
            <h1>{type}(s)</h1>
            {(data.posts)?
                <div>
                    {
                        data.posts.map((post: Post) => (
                            <div className={"productWrapper"} key={post.post_id}>
                                <div>
                                    <p className={"productTitle"}>name: {post.post_name}</p>
                                    <p className={"productPrice"}>id: {post.post_id}</p>
                                    <p className={"productPrice"}>status: {post.post_status}</p>
                                </div>
                                <Link href={`http://localhost:3000/admin/posttype/${type}/update/${post.post_id}`}>
                                    <button>show {type}</button>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                :<div>No {type}(s) was found</div>
            }
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const type = params.type;
    const endpoint = `http://localhost:8010/proxy/api/posttype/${type}`;

    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }
    let posts:any = []
    try{
        await fetch(endpoint, options).then((response)=>{
            if (response.ok){
                return response.json()
            }else{
                throw Exception
            }
        }).then((data)=>{
            posts = data
        })
        return {
            props: {
                posts,
            },
        }
    }catch {
        return {
            props: {
                posts,
            },
        }
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default PosttypeIndex
