import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import PostMeta from "../../../models/PostMeta";
import {FormEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";

const AdminUpdateSinglePost: NextPage = (data: any) => {
    if (!data) return <p>No info found</p>

    const [changedPostData, setChangedPostData] = useState(null);
    const [changedPostMeta, setChangedPostMeta] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const user = useSelector((state)=>(state.user))

    const handleSubmit = (e: FormEvent, postId: number) =>{
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

    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        const endpoint = `http://localhost:8010/proxy/category/posttype/product`

        fetch(endpoint)
            .then(resp=>resp.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    const [postCategories, setPostCategories] = useState([]);
    useEffect(()=>{
        const endpoint = `http://localhost:8010/proxy/category/post/${data.postData.post_id}`

        fetch(endpoint)
            .then(resp=>resp.json())
            .then(data => {
                setPostCategories(data)
            })
    }, [])

    const findCommonElement = (element:any) => {
        for(let j = 0; j < postCategories.length; j++) {
            if(element.category_id === postCategories[j].category_id) {
                return true;
            }
        }
        return false;
    }

    const [updatedCategories, setUpdatedCategories] = useState([]);
    const updateCategory = (e :FormEvent ,postId:number) => {
        e.preventDefault()

        const payload = {
            "category_id": updatedCategories,
            "post_id": postId
        }

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:8010/proxy/category/addpost"

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


    const updateChangeCategory = (e: FormEvent) =>{
        const value = e.target.value;
        const checked = e.target.checked;
        // @ts-ignore
        setUpdatedCategories({...updatedCategories, [value]: checked})
    }

    return (
        <div>
            <form onSubmit={(e:FormEvent)=>{
                updateCategory(e, data.postData.post_id)
            }}>
                {categories.map((category:any)=>
                    <div>
                        <label htmlFor={category.category_name}>{category.category_name}</label>
                        <input type="checkbox" name={category.category_name} onChange={updateChangeCategory} value={category.category_id} defaultChecked={findCommonElement(category)}/>
                    </div>
                )}
                <input type="submit" value={"Change Category"}/>
            </form>


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

                        <label htmlFor="post_slug">Post slug</label>
                        <input type={"text"} name={"post_slug"} defaultValue={data.postData.post_slug} onChange={handlePostDataChanges} />

                        <label htmlFor="post_featuredImage">Featured Image</label>
                        <input type={"text"} name={"post_featuredImage"} defaultValue={data.postData.post_featuredImage} onChange={handlePostDataChanges} />

                        <label htmlFor="post_excerpt">Post excerpt</label>
                        <input type={"text"} name={"post_excerpt"} defaultValue={data.postData.post_excerpt} onChange={handlePostDataChanges} />
                    </div>
                    <div>
                        <h4>meta values</h4>
                        {(data)?data.postMeta.map((postMeta: PostMeta) => (
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
