import {FormEvent} from "react";
import {GetStaticProps} from "next";
import PostType from "../../../models/PostType";


//maybe should show the postid after creation or redirect to it hmmm...
const AdminCreatePage = (data:any) => {
    return (
        <div>
            <form className={"formHolder"} method="post" onSubmit={(e)=>{
                createPost(e)
            }} >
                <label htmlFor="post_name">Post Name</label>
                <input type="text" name="post_name" id="post_name" className={"inputField"} required/>

                <label htmlFor="post_status">Post Status</label>
                <input type="text" name="post_status" id="post_status" className={"inputField"} required/>

                <label htmlFor="post_type">Post Type</label>
                <select name="post_type" >
                    {data.posttypes.map((posttype: PostType) => (
                        <option value={posttype.posttype_name} key={posttype.posttype_id}>{posttype.posttype_name}</option>
                    ))}
                </select>

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetch(`http://localhost:5000/api/posttypes`);
    const posttypes = await data.json();
    return {
        props: {
            posttypes,
        },
    }
}


const createPost = async (e: FormEvent) => {
    e.preventDefault()

    // @ts-ignore
    const data = {
        post_name: e.target.post_name.value,
        post_status: e.target.post_status.value,
        post_type: e.target.post_type.value,
    }

    const JSONdata = JSON.stringify(data);

    const endpoint = "http://localhost:5000/api/page"

    const options = {
        method: 'POST',
        mode: "no-cors",
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*",
            "Access-Control-Allow-Origin": "*"
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
                return {
                    props: data
                }
            }
        );

}

export default AdminCreatePage
