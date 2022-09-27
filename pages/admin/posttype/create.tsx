import {FormEvent} from "react";
import {useSelector} from "react-redux";

const AdminCreatePostType = () => {

    const user = useSelector((state)=>(state.user))

    const createPostType = async (e: FormEvent) => {
        e.preventDefault()

        // @ts-ignore
        const data = {
            posttype_name: e.target.posttype_name.value,
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



export default AdminCreatePostType
