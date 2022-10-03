import {FormEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import PostMetaField from "../../../models/PostMetaField";

const AdminCreatePostType = () => {

    const user = useSelector((state)=>(state.user))
    const [postTypeModel, setPostTypeModel] = useState<PostMetaField[]>([]);

    const createPostType = async (e: FormEvent) => {
        e.preventDefault()

        // @ts-ignore
        const data = {
            posttype_name: e.target.posttype_name.value,
            posttype_fields: postTypeModel
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = "http://localhost:8010/proxy/api/posttypes"

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwtToken,
            },
            body: JSONdata
        }

        // @ts-ignore
        const response = await fetch(endpoint, options)
            .then(resp=>{
                console.log("resp");
                console.log(resp);
            }).then(
                data => {
                    console.log("success");
                    console.log(data);
                }
            );
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
            <form className={"formHolder"} method="post" onSubmit={(e)=>{
                createPostType(e)
            }} >
                <label htmlFor="posttype_name">Post Name</label>
                <input type="text" name="posttype_name" id="posttype_name" className={"inputField"} required/>

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

                <button type="submit">Create PostType</button>
            </form>
        </div>
    )
}



export default AdminCreatePostType
