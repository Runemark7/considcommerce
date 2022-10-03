import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Post from "../../../models/Post";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {useState} from "react";
import PostMetaField from "../../../models/PostMetaField";

const AdminPages: NextPage = (data:any) => {
    const router = useRouter()
    const { type } = router.query

    const user = useSelector((state)=>(state.user))

    const [postTypeModel, setPostTypeModel] = useState<PostMetaField[]>([]);

    const getPostModel = (type:String)=>{
        const endpoint = `http://localhost:8010/proxy/api/posttype/model/${type}`

        const options = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwtToken,
            },
        }

        fetch(endpoint, options)
            .then(resp=>resp.json())
            .then(data => {
                    setPostTypeModel(data)
                });
    }

    return (
        <div>
            <button onClick={()=>{
                if(type){
                    getPostModel(type)
                }
            }}>Add new post</button>

            <div>
                <form action="">
                <label htmlFor="post_name">Post Name</label>
                <input type="text" name="post_name" id="post_name" className={"inputField"} required/>

                <label htmlFor="post_status">Post Status</label>
                <input type="text" name="post_status" id="post_status" className={"inputField"} required/>

                    {(postTypeModel.length > 0)?
                        <div>
                            {postTypeModel.map((postMeta:PostMetaField)=>
                                <div>
                                    {postMeta.meta_key}
                                    {(postMeta.data_type == "boolean")?
                                        <input type="checkbox" name="requiredMeta" onChange={(e)=>{
                                        }} checked={(postMeta.meta_required)}/>
                                        :<></>}

                                    {(postMeta.data_type == "integer")?
                                        <input type="number" onChange={(e)=>{
                                        }} checked={(postMeta.meta_required)}/>
                                        :<></>}

                                    {(postMeta.data_type == "string")?
                                        <input type="text" onChange={(e)=>{
                                        }} checked={(postMeta.meta_required)}/>
                                        :<></>}

                                    {(postMeta.meta_required)?"*":""}
                                </div>
                            )}
                        </div>
                        :<></>}
                </form>
            </div>

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
    let posts = null;

    if (data){
        posts = await data.json();
    }

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
