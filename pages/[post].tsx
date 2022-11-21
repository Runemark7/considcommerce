import {GetStaticPaths, GetStaticProps} from "next";
import PageEditorClear from "../components/editor/PageEditorClear";
import {fetchData} from "../core/fetchDataHelper";

const PostLayout = (data:any) => {
    return (
        <div>
            {(data)?(
                <div>
                    {data.postData.post_name}
                    <p>
                        {data.postData.post_excerpt}
                    </p>
                    <PageEditorClear postId={data.postData.post_id} postContent={data.postData.post_content} />
                </div>
            ):<></>}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const post = (params.post != undefined)?params.post:null;
    if (!post){
        return {
            notFound: true
        }
    }

    const endpoint = `/api/post/slug/${post}`
    const postData = await fetchData({
        endpoint: endpoint,
        method: "GET",
        headers: "",
        token:"",
        body: null,
    })

    if(postData) {
        return {
            props: {
                postData,
            },
        }
    } else{
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
