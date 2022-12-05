import type {GetServerSidePropsContext, NextPage} from 'next'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";

const TypeCategories: NextPage = (props:any) => {
    const router = useRouter()
    const { type } = router.query

    const createCategory = (e: FormEvent)=>{
        e.preventDefault()

        const payload = {
            "category_name": e.target.category_name.value,
            "posttype_name": type
        }

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:3000/api/middleroutes/posttype/createcategory"

        const options = {
            method: 'POST',
            body:JSONdata
        }

        fetch(endpoint, options)
            .then((resp)=>{
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
        }
    }

    const res = await fetch(endpoint, options);
    if(res.status == 201){
        const categories = await res.json();
        return {
            props: {
                categories
            }
        }
    }else{
        return {
            props: {
                categories: []
            }
        }
    }

}

export default TypeCategories
