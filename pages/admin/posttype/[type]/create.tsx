import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
import PostMetaField from "../../../../models/PostMetaField";

const TypeCreate: NextPage = () => {
    const router = useRouter()
    const { type } = router.query

    const user = useSelector((state)=>(state.user))

    const [postTypeModel, setPostTypeModel] = useState<PostMetaField[]>([]);

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
            .then((resp)=>{
                if (resp.ok){
                    return resp.json()
                }
            })
            .then(data => {
            })

    }

    useEffect(() =>{
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
    }, [])

    return (
        <div>
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
                                {postMeta.meta_key}{(postMeta.meta_required)?"*":""}
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
                            </div>
                        )}
                    </div>
                    :<></>}
                <input type="submit"/>
            </form>
        </div>
    )
}

export default TypeCreate
