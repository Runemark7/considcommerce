import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";

const TypeCategories: NextPage = (data:any) => {
    const router = useRouter()
    const { type } = router.query

    const user = useSelector((state)=>(state.user))

    const createCategory = (e: FormEvent)=>{
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

    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        const endpoint = `http://localhost:8010/proxy/category/posttype/product`

        fetch(endpoint)
            .then(resp=>resp.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    return (
        <div>
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
                    {categories.map((category:any)=>
                        <p>{category.category_name}</p>
                    )}
                </div>

            </div>


        </div>
    )
}

export default TypeCategories
