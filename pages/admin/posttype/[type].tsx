import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Post from "../../../models/Post";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useState} from "react";
import PostMetaField from "../../../models/PostMetaField";

const AdminPages: NextPage = (data:any) => {
    const router = useRouter()
    const { type } = router.query

    const user = useSelector((state)=>(state.user))

    const [postTypeModel, setPostTypeModel] = useState<PostMetaField[]>([]);

    const [toggleCreatePost, setCreatePost] = useState(false);

    const addNewPostToggle = () =>{
        if (toggleCreatePost){
            setCreatePost(false);
        }else{
            setCreatePost(true);
        }
    }

    const getPostModel = (type:String)=>{
        addNewPostToggle()

        if(!postTypeModel){
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
    }

    const [postData, setPostData] = useState({
        "post_type": type,
    });

    const [postMeta, setPostMeta] = useState(null);

    const handleMetaDataChanges = (e: FormEvent) =>{
        const name = e.target.name;
        const value = e.target.value;
        // @ts-ignore
        setPostMeta({...postMeta, [name]: value})
    }

    const handlePostDataChanges = (e: FormEvent) =>{
        const name = e.target.name;
        const value = e.target.value;
        // @ts-ignore
        setPostData({...postData, [name]: value})
    }

    const handleSubmit = (e :FormEvent)=>{
        e.preventDefault()

        const payload = {
            "postData": postData,
            "postMeta": postMeta
        }

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:8010/proxy/api/post"

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.jwtToken,
            },
            body:JSONdata
        }

        fetch(endpoint, options)
            .then(resp=>resp.json())
            .then(data => {
            })

    }

    //TODO: should wait for validation from server and send response to client
    return (
        <div>
            <button onClick={()=>{
                if(type){
                    getPostModel(type)
                }
            }}>Add new post</button>

            <div className={(toggleCreatePost)?"showCreatePost":"hideCreatePost"}>
                <form onSubmit={handleSubmit}  >
                    <label htmlFor="post_name">PostName*</label>
                    <input type={"text"} name="post_name" onChange={handlePostDataChanges} required={true}/>

                    <label htmlFor="post_status">Post status*</label>
                    <input type={"text"} name="post_status" onChange={handlePostDataChanges} required={true}/>

                        {(postTypeModel.length > 0)?
                            <div>
                                {postTypeModel.map((postMeta:PostMetaField, index:number)=>
                                    <div key={index}>
                                        {postMeta.meta_key}
                                        {(postMeta.data_type == "boolean")?
                                            <input type="checkbox" name={postMeta.meta_key} onChange={handleMetaDataChanges} required={postMeta.meta_required}/>
                                            :<></>}

                                        {(postMeta.data_type == "integer")?
                                            <input type="number" name={postMeta.meta_key} onChange={handleMetaDataChanges} required={postMeta.meta_required} />
                                            :<></>}

                                        {(postMeta.data_type == "string")?
                                            <input type="text" name={postMeta.meta_key} onChange={handleMetaDataChanges} required={postMeta.meta_required}/>
                                            :<></>}

                                        {(postMeta.meta_required)?"*":""}
                                    </div>
                                )}
                            </div>
                            :<></>}
                    <input type="submit"/>
                </form>
            </div>
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
    const data = await fetch(endpoint, options);
    const posts = await data.json();
    return {
        props: {
            posts,
        },
    }
    /*try{
        // @ts-ignore
        const {posts, errors} = await fetch(endpoint, options);
        if (errors || !posts){
            return {
                notFound: true
            }
        }
        return {
            props: {
                posts
            }
        }
    }catch{
        return {
            props: {
                "posts": []
            }
        }
    }*/
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export default AdminPages
