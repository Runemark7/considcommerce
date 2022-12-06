import {useEffect, useState} from "react";
import PageEditorClear from "../components/editor/PageEditorClear";
import { fetchData } from "../core/fetchDataHelper";

const Home = () => {
    const [postData, setPostData] = useState([])

    useEffect(()=>{
        async function getSlug(){
            await fetchData({
                body: undefined,
                endpoint: "/api/admin/settings/homeSlugPostUrl",
                headers: "",
                method: "GET",
                token: ""}
            ).then((data)=>{
                fetchData({
                    body: undefined,
                    endpoint: `/api/post/slug/${data.option_value}`,
                    headers: "",
                    method: "GET",
                    token: ""}
                ).then((postData) => {
                    setPostData(postData)
                })
            })
        }

        getSlug()
    }, [])

    return(
        <div className={"homeWrapper"}>
            {(postData.post_content)
                ?
                <PageEditorClear postId={postData.post_id} postContent={postData.post_content} />
                :
                <></>
            }
        </div>
    )
}

export default Home
