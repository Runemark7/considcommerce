import type { NextPage } from 'next'
import {FormEvent, useEffect, useState} from "react";
import fetchData from "../../../core/fetchDataHelper";
import {useSelector} from "react-redux";
import {set} from "immutable";
import {Simulate} from "react-dom/test-utils";
import dragOver = Simulate.dragOver;
import PostType from "../../../models/PostType";
import Post from "../../../models/Post";

const AdminCustomizerSettings: NextPage = () => {
    const user = useSelector((state)=>(state.user))

    const [data, setData] = useState([])

    const handleSubmit = (e :FormEvent) => {
        e.preventDefault()



    }

    useEffect(()=> {
        async function getData () {
            const data = await fetchData({
                body: undefined,
                endpoint: "/api/pages",
                headers: "",
                method: "GET",
                token: ""
            })

            setData(data)
        }

        getData()
    }, [])



    return (
        <div className={"componentWrapper"}>
            <h1>
                Customizer settings
            </h1>

            <form onSubmit={(e:FormEvent)=>{
                handleSubmit(e)
            }}>
                <label htmlFor={"homePageRoute"}>Home page</label>
                <input type="text" name={"homePageRoute"}/>

                <label htmlFor={"pageName"}>Store name</label>
                <input type="text" name={"pageName"}/>

                <label htmlFor={"homeSlugPostUrl"}>Choose what page to show on home</label>
                <select name="homeSlugPostUrl">
                    {(data.length>0)?data.map((post:Post)=>
                        <option value={post.post_slug}>{post.post_name}</option>
                    ):<></>}
                </select>

                <input type="submit" value={"Save"}/>
            </form>
        </div>
    )
}

export default AdminCustomizerSettings
