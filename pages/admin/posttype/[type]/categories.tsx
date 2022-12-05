import type {GetServerSidePropsContext, NextPage} from 'next'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";

const TypeCategories: NextPage = (props:any) => {
    const router = useRouter()
    const { type } = router.query

    const user = useSelector((state)=>(state.user))

    const createCategory = (e: FormEvent)=>{
        //TODO: post request using body and route, make generic route for admin post/get methods
        e.preventDefault()

        const payload = {
            "category_name": e.target.category_name.value,
            "posttype_name": type
        }

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:8010/proxy/category/create"

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.jwtToken,
            },
            body:JSONdata
        }

        fetch(endpoint, options)
            .then((resp)=>{
                if (resp.ok){
                    return resp.json()
                }
            })
            .then(data => {
            })
    }

    return (
        <div>

            <h1>
                Categories for {type}
            </h1>
            <h3>Add another category</h3>
            <form onSubmit={createCategory}>
                <label htmlFor="category_name">Category name*</label>
                <input type={"text"} name="category_name"  required={true}/>
                <input type="submit"/>
            </form>

            <div>
                <h3>
                    Categories
                </h3>
                <div>
                    {(props.categories)?props.categories.map((category:any)=>
                        <p>{category.category_name} ({category.amount_of_posts})</p>
                    ):<></>}
                </div>
            </div>

        </div>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const type = context.params?.type;
    const endpoint = `http://localhost:8010/proxy/category/posttype/${type}`

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const categories = await res?.json();
    return {
        props: {
            categories
        }
    }
}

export default TypeCategories
