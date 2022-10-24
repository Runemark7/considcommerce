import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Post from "../../../models/Post";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useState} from "react";
import PostMetaField from "../../../models/PostMetaField";
import {Exception} from "sass";
import {getObjectClassLabel} from "next/dist/shared/lib/is-plain-object";

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

        if(postTypeModel){
            const endpoint = `http://localhost:8010/proxy/api/posttype/model/${type}`

            const options = {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.jwtToken,
                },
            }
            fetch(endpoint, options)
                .then((resp)=>{
                    if (resp.status == 201){
                        return resp.json()
                    }
                })
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

    const handleFileUpload = (e: FormEvent) => {
        e.preventDefault()
        console.log(e.target.files)

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

    const createCategory = (e: FormEvent)=>{
        e.preventDefault()

        const payload = {
            "category_name": e.target.category_name.value,
            "posttype_name": type
        }

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:8010/proxy/category/create"

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
                console.log(data)
            })
    }

    const [newPostMetaField, setNewPostMetafield] = useState<PostMetaField>({
        meta_required:false,
        data_type: "string",
        meta_key: ""
    });

    const addFieldToDataModel = (e:FormEvent,type:String)=>{
        e.preventDefault()

        if(type && newPostMetaField.meta_key){
            const endpoint = `http://localhost:8010/proxy/api/posttype/model/update`

            const payload = {
                "posttype_name": type,
                "posttype_field": newPostMetaField
            }

            const JSONdata = JSON.stringify(payload);

            const options = {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.jwtToken,
                },
                body:JSONdata
            }
            fetch(endpoint, options)
                .then((resp)=>{
                    if (resp.status == 201){
                        return resp.json()
                    }
                })
                .then(msg => {
                    console.log(msg)
                });
        }else{
            console.log("error")
        }
    }

    const updateFieldValue = (postField:String, newValue:any) => {
        if(postField == "meta_key"){
            setNewPostMetafield({...newPostMetaField, meta_key:newValue})
        }else if(postField == "data_type"){
            setNewPostMetafield({...newPostMetaField, data_type:newValue})
        }else if(postField == "meta_required"){
            if (newPostMetaField.meta_required){
                setNewPostMetafield({...newPostMetaField, meta_required:true})
            }
        }
    }
    return (
        <div>
            <button>Add metafield to datamodel</button>

            <form onSubmit={(e:FormEvent)=>{
                addFieldToDataModel(e, type)
            }}>
                <input type="text" onChange={(e)=>{
                    updateFieldValue("meta_key", e.target.value)
                }}/>

                <select onChange={(e)=>{
                    updateFieldValue("data_type", e.target.value)
                }}>
                    <option value="string" defaultChecked={true}>String</option>
                    <option value="integer">Int</option>
                    <option value="boolean">Boolean</option>
                    <option value="date">Date</option>
                    <option value="file">File</option>
                </select>

                <input type="checkbox" name="requiredMeta" onChange={(e)=>{
                    updateFieldValue("meta_required",false)
                }} defaultChecked={true} />Required
                <input type="submit" value={"Add field"}/>
            </form>

            <form onSubmit={createCategory}>
                <label htmlFor="category_name">Category name*</label>
                <input type={"text"} name="category_name"  required={true}/>
                <input type="submit"/>
            </form>

            <button onClick={()=>{
                if(type){
                    getPostModel(type)
                }
            }}>Add new post</button>

            <div className={(toggleCreatePost)?"showCreatePost":"hideCreatePost"}>
                <form onSubmit={handleSubmit}  >
                    <label htmlFor="post_name">PostName*</label>
                    <input type={"text"} name="post_name" onChange={handlePostDataChanges} required={true}/>

                    <label htmlFor="post_slug">Post slug*</label>
                    <input type={"text"} name="post_slug" onChange={handlePostDataChanges} required={true}/>

                    <label htmlFor="post_status">Post status*</label>
                    <input type={"text"} name="post_status" onChange={handlePostDataChanges} required={true}/>

                    <label htmlFor="post_featuredImage">Post featured image*</label>
                    <input type={"text"} name="post_featuredImage" onChange={handlePostDataChanges} required={true}/>

                        {(postTypeModel)?
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

                                        {(postMeta.data_type == "file")?
                                            <input type="file" name={postMeta.meta_key} onChange={handleMetaDataChanges} required={postMeta.meta_required}/>
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
    let posts:any = []
    try{
        await fetch(endpoint, options).then((response)=>{
            if (response.status==201){
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
