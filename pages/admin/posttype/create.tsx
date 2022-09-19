import {FormEvent} from "react";

const AdminCreatePostType = () => {
    return (
        <div>
            <form className={"formHolder"} method="post" onSubmit={(e)=>{
                createPostType(e)
            }} >
                <label htmlFor="posttype_name">Post Name</label>
                <input type="text" name="posttype_name" id="posttype_name" className={"inputField"} required/>

                <button type="submit">Create PostType</button>
            </form>
        </div>
    )
}

const createPostType = async (e: FormEvent) => {
    e.preventDefault()

    // @ts-ignore
    const data = {
        posttype_name: e.target.posttype_name.value,
    }

    const JSONdata = JSON.stringify(data);

    const endpoint = "http://localhost:5000/api/posttypes"

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
                console.log("success");
                console.log(data);
            }
        );

}

export default AdminCreatePostType
