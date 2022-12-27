import type {GetServerSidePropsContext, NextPage} from 'next'
import {FormEvent, useState} from "react";

const AdminUpdateSingleOrder: NextPage = (props: any) => {
    const [orderPostMeta, setOrderPostMeta] = useState(null);

    const handlePostDataChanges = (e: FormEvent) =>{
        const name = e.target.name;
        const value = e.target.value;
        // @ts-ignore
        setOrderPostMeta({...orderPostMeta, [name]: value})
    }

    const handleSubmit = (e: FormEvent, postId: number) =>{
        e.preventDefault();

        const payload = {
            "postId": postId,
            "postData": [],
            "postMeta": orderPostMeta
        }
        console.log(orderPostMeta)

        const JSONdata = JSON.stringify(payload);

        const endpoint = "http://localhost:3000/api/middleroutes/updateorder"

        const options = {
            method: 'POST',
            body:JSONdata
        }

        fetch(endpoint, options)
            .then(resp=>resp.json())
            .then(data => {
            })
    }


    return (
        <div>
            <h1>Order</h1>

            <div>
                <h3>Order info</h3>

                <p>Orderid: {props.postData.post_id}</p>
                <p>Klarna order id: {props.postData.klarna_order_id}</p>
                <p>Klarna order amount: {props.postData.klarna_order_amount}</p>



                <form className={"formHolder"} onSubmit={(e:FormEvent)=>{
                    handleSubmit(e, props.postData.post_id);
                }} >
                <label htmlFor="post_name">Order name</label>
                    <input type={"text"} name={"post_name"} defaultValue={props.postData.post_name} onChange={handlePostDataChanges} />

                    <label htmlFor="payment_method">Payment method</label>
                    <input type={"text"} name={"payment_method"} defaultValue={props.postData.payment_method} onChange={handlePostDataChanges} />

                    <label htmlFor="orderStatus">Orderstatus</label>
                    <select name="orderStatus" onChange={handlePostDataChanges} >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>

                    <br/>
                    <input type="submit" value={"Update order"}/>
                </form>

            </div>
        </div>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const orderid = context.params?.orderid;
    const endpoint = `http://localhost:8010/proxy/api/post/postid/${orderid}`

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const postData = await res?.json();

    return {
        props: {
            postData
        }
    }
}

export default AdminUpdateSingleOrder
