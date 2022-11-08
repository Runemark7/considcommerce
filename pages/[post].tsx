import {GetStaticPaths, GetStaticProps} from "next";
import {Exception} from "sass";
import PageEditorClear from "../components/editor/PageEditorClear";

const PostLayout = (data:any) => {
    return (
        <div>
            {(data)?(
                <div>
                    {data.postData.post_name}
                    <p>
                        {data.postData.post_excerpt}
                    </p>
                    <PageEditorClear postId={data.postData.post_id}/>
                </div>
            ):<></>}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const post = params.post;
    const endpoint = `http://localhost:8010/proxy/api/post/slug/${post}`
    let postData:any = null;
    try{
        await fetch(endpoint).then((response)=>{
            if (response.ok){
                return response.json()
            }else{
                throw Exception
            }
        }).then((data)=>{
            postData = data
        })
        return {
            props: {
                postData,
            },
        }
    }catch {
        return {
            notFound: true
        }
    }

}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default PostLayout
