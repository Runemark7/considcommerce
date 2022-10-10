import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
import PostMetaField from "../../../../models/PostMetaField";
import PostType from "../../../../models/PostType";

const AdminModifyPostTypeFields: NextPage = () => {
    const user = useSelector((state)=>(state.user))

    const [postTypeModel, setPostTypeModel] = useState<PostMetaField[]>([]);
    const [isLoading, setLoading] = useState(false)
    const [postTypes, setPostTypes] = useState(null);

    useEffect(()=>{
        setLoading(true)
        fetch('http://localhost:8010/proxy/api/posttypes')
            .then((res)=>res.json())
            .then((data)=>{
                setPostTypes(data)
                setLoading(false)
            })
    }, [])

    const getPostTypeModel = (posttype: string)=>{
        const endpoint = `http://localhost:8010/proxy/api/posttype/model/${posttype}`

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

    const addAnotherField = ()=> {
        setPostTypeModel((oldArray :PostMetaField[]) => {
            let newElement:PostMetaField = {
                meta_key: "",
                data_type: "",
                meta_required: false,
            };
            return [...oldArray, newElement];
        })
    }

    const updateFieldValue = (postField:String, newValue:any, index :number) => {
        const newArr: PostMetaField[] = postTypeModel.map((obj:PostMetaField, i:number) => {
            if (i == index){
                if(postField == "meta_key"){
                    return {...obj, meta_key: newValue}
                }else if(postField == "data_type"){
                    return {...obj, data_type: newValue}
                }else if(postField == "meta_required"){
                    if (obj.meta_required){
                        return {...obj, meta_required: false}
                    }else{
                        return {...obj, meta_required: true}
                    }
                }
                return obj
            }
            return obj
        })

        setPostTypeModel(newArr)
    }

    const removeMetaField = (index :number) => {
        const newArr:PostMetaField[] = postTypeModel.filter((postMetaField: PostMetaField, i: number) => i !== index)
        setPostTypeModel(newArr)
    }

    return (
        <div>
            <select onChange={(e)=>{
                getPostTypeModel(e.target.value)
            }}>
                {(postTypes) ? postTypes.map((posttype: PostType) => (
                    <option value={posttype.posttype_name}> {posttype.posttype_name}</option>
                )):<></>}
            </select>

            {(postTypeModel)?
                postTypeModel.map((postMetaField: PostMetaField, index :number) =>
                    <div key={index}>
                        <input type="text" onChange={(e)=>{
                            updateFieldValue("meta_key", e.target.value, index)
                        }}/>

                        <select onChange={(e)=>{
                            updateFieldValue("data_type", e.target.value, index)
                        }}>
                            <option value="string">String</option>
                            <option value="integer">Int</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>
                            <option value="file">File</option>
                        </select>

                        <input type="checkbox" name="requiredMeta" onChange={(e)=>{
                            updateFieldValue("meta_required",null, index)
                        }} checked={(postMetaField.meta_required)}/>Required

                        <div onClick={()=>{
                            removeMetaField(index)
                        }}>Remove field</div>

                    </div>
                )
                :<></>}

            <div onClick={addAnotherField}>Add model field</div>

            update posttype
        </div>

    )
}

export default AdminModifyPostTypeFields
