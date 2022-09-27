import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import PostMeta from "../../../models/PostMeta";
import {FormEvent, useState} from "react";
import {useSelector} from "react-redux";

const AdminUpdateSinglePost: NextPage = (data: any) => {
    if (!data) return <p>No info found</p>

    const [changedPostData, setChangedPostData] = useState(null);
    const [changedPostMeta, setChangedPostMeta] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const user = useSelector((state)=>(state.user))

    const handleSubmit = (e: FormEvent, postId) =>{
        e.preventDefault();

        const payload = {
            "postId": postId,
            "postData": changedPostData,
            "postMeta": changedPostMeta
        }

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:8010/proxy/api/update/post"

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
                setLoading(false)
            })

    }

    const handleMetaDataChanges = (e: FormEvent) =>{
        const name = e.target.name;
        const value = e.target.value;
        // @ts-ignore
        setChangedPostMeta({...changedPostMeta, [name]: value})
    }

    const handlePostDataChanges = (e: FormEvent) =>{
        const name = e.target.name;
        const value = e.target.value;
        // @ts-ignore
        setChangedPostData({...changedPostData, [name]: value})
    }

    return (
        <div>
            <form className={"formHolder"} onSubmit={(e:FormEvent)=>{
                handleSubmit(e, data.postData.post_id);
            }} >
                <div className={"productWrapper"}>
                    <div>
                        <p> id: {data.postData.post_id} </p>
                        <label htmlFor="post_name">PostName</label>
                        <input type={"text"} name={"post_name"} defaultValue={data.postData.post_name} onChange={handlePostDataChanges} />

                        <label htmlFor="post_status">Post status</label>
                        <input type={"text"} name={"post_status"} defaultValue={data.postData.post_status} onChange={handlePostDataChanges} />
                    </div>
                    <br/>
                    <div>
                        <h4>meta values</h4>
                        {(data.postMeta.length != 0)?data.postMeta.map((postMeta: PostMeta) => (
                            <div className={"productWrapper"} key={postMeta.meta_id}>
                                <p className={"productTitle"}>{postMeta.meta_key}</p>
                                <input type={"text"} name={postMeta.meta_key} defaultValue={postMeta.meta_value} onChange={handleMetaDataChanges} />
                            </div>
                        )):<div>Can't find any meta values</div>}
                    </div>
                </div>
                <input type="submit" value={"Update"}/>
            </form>
        </div>
    )
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    // @ts-ignore
    const post_id = params.post_id[2]

    const data = await fetch(`http://localhost:8010/proxy/api/post/${post_id}`);
    const postData = await data.json();
    return {
        props: postData
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default AdminUpdateSinglePost
