import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import PostMeta from "../../../models/PostMeta";
import {FormEvent} from "react";

const AdminUpdateSinglePost: NextPage = (data: any) => {
    if (!data.postData) return <p>No profile data</p>

    return (
        <div>
            <form className={"formHolder"} method="post" onSubmit={(e)=>{
                updatePost(e)
            }} >
                <div className={"productWrapper"}>
                    <div>
                        <p> id: {data.postData.post_id} </p>
                        <label htmlFor="post_name">PostName</label>
                        <input type={"text"} name={"post_name"} value={data.postData.post_name}/>

                        <label htmlFor="post_status">Post status</label>
                        <input type={"text"} name={"post_status"} value={data.postData.post_status}/>
                    </div>
                    <br/>
                    <div>
                        <h4>meta values</h4>
                        {data.postMeta.map((postMeta: PostMeta) => (
                            <div className={"productWrapper"} key={postMeta.meta_id}>
                                <p className={"productTitle"}>meta: {postMeta.meta_key}</p>
                                <input type="text" name={postMeta.meta_key} value={postMeta.meta_value} />
                            </div>
                        ))}
                    </div>

                </div>

                <input type="submit" value={"Update"}/>
            </form>
        </div>
    )
}

const updatePost = async (e: FormEvent) => {
    e.preventDefault()

    const postData = {
        post_name: e.target.post_name.value,
        post_type: e.target.post_status.value
    }

    //TODO: don't know how to get all the meta here :C
    const postMeta = [
        {

        }
    ]

    const returnObj = {
        "postData": postData,
        "postMeta": postMeta
    }

    const JSONdata = JSON.stringify(returnObj);

    const endpoint = "http://localhost:8010/proxy/api/posttypes"

    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSONdata
    }

    // @ts-ignore
    const response = await fetch(endpoint, options)
        .then(resp=>resp.json())
        .then(data => {
                console.log("success");
                console.log(data);
            }
        );

}



export const getStaticProps: GetStaticProps = async ({params}) => {
    // @ts-ignore
    const post_id = params.post_id[1]

    const data = await fetch(`http://localhost:8010/proxy/api/post/${post_id}`);
    const postData = await data.json();
    return {
        props: postData
    }
}

//TODO: should check if second param is numeric and there is not something else there too.
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export default AdminUpdateSinglePost
