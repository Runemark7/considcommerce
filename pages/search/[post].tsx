import { useRouter } from 'next/router'
import {GetStaticPaths, GetStaticProps} from "next";
import Post from "../../models/Post";

const SearchListResult = (posts: Post[]) => {
    const router = useRouter()
    const { post } = router.query

    return (
        <div className={"productWrapper"}>
            Search result for: {post}
            {(posts.posts)?
                (
                    posts.posts.map((post: Post)=>(
                        <div>
                            {post.post_name}
                        </div>
                    ))
                )
                :
                <div>
                    Nothing found!
                </div>
            }
        </div>
    );
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    const searchterm = params.post;
    const endpoint = `http://localhost:8010/proxy/api/search/${searchterm}`
    const posts = await fetch(endpoint).then(resp => {
        if (resp.ok){
            return resp.json()
        }
    }).then((respData)=>{
        return respData
    })

    if (posts){
        return {
            props: {
                posts,
            },
        }
    }else{
        return {
            props: {
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


export default SearchListResult
