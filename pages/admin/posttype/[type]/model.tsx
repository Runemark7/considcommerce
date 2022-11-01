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

    useEffect(() =>{
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
    }, [type])

    const [newPostMetaField, setNewPostMetafield] = useState<PostMetaField>({
        meta_required:false,
        data_type: "string",
        meta_key: ""
    });

    const addFieldToDataModel = (e:FormEvent)=>{
        e.preventDefault()

        if(newPostMetaField.meta_key){
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
                });
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
            <h1>Model</h1>

            <div>
                <h3>
                    Existing Custom Fields:
                </h3>

                {(postTypeModel)?postTypeModel.map((postMeta:PostMetaField)=>
                    <div key={postMeta.meta_key}>
                        <p>
                            Metakey: {postMeta.meta_key}
                            <br/>
                            MetaType: {postMeta.data_type}
                            <br/>
                            Required: {(postMeta.meta_required)?"yes":"no"}
                        </p>
                    </div>
                ):<></>}
            </div>

            <h3>
                Add New Custom Field:
            </h3>
            <form onSubmit={(e:FormEvent)=>{
                addFieldToDataModel(e)
            }}>
                <input type="text" placeholder={"Metakey name"} onChange={(e)=>{
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
        </div>
    )
}

export default TypeCreate