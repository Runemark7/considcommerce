import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {GetServerSidePropsContext} from "next";
import Link from "next/link";

const OrderDetail = (data: any) => {
    const [klarnaData, setKlarnaData] = useState(null);


    useEffect(()=>{
        if (data && data.data.payment_method == "klarnaCheckout" && data.data.klarna_order_id != null){
            console.log(data.data.klarna_order_id)
            const order_id = data.data.klarna_order_id;
            console.log(order_id)

            const endpoint = `https://api.playground.klarna.com/checkout/v3/orders/${order_id}`

            const options = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + window.btoa('PK64251_9ae70e07d814:GwxiSlLjCLj8t8B3'),
                },
            }

            fetch(endpoint, options)
                .then(resp=>{
                    console.log(resp.statusText)
                    if (resp.ok){
                        return resp.json()
                    }
                })
                .then(data => {
                    setKlarnaData(data)
                })
        }
    },[data])

    return (
        <div className={"productWrapper componentWrapper"}>
            <ul>
                <li>
                    <Link href={"http://localhost:3000/profile/order"}>
                        Orders
                    </Link>
                </li>
                <li>
                    <Link href={"http://localhost:3000/profile/settings"}>
                        Settings
                    </Link>

                </li>
            </ul>
                {(data) ?
                    <div>
                        <div>
                            {
                                (klarnaData)?
                                    <div>
                                        <h4>Order details</h4>

                                        {klarnaData.billing_address.email}
                                        <br/>
                                        {klarnaData.billing_address.given_name} {klarnaData.billing_address.family_name}
                                        <br/>
                                        {klarnaData.billing_address.phone}
                                        <br/>
                                        {klarnaData.billing_address.street_address}
                                        <br/>
                                        {klarnaData.billing_address.country} {klarnaData.billing_address.postal_code} {klarnaData.billing_address.city}

                                        <h4>Products</h4>

                                        <DataTable columns={[
                                            {
                                                name: "Product name",
                                                selector: row => row.name
                                            },
                                            {
                                                name: "Quantity",
                                                selector: row => row.quantity
                                            },
                                            {
                                                name: "Unit price",
                                                selector: row => Math.round(row.unit_price/100),
                                                sortable: true
                                            },
                                            {
                                                name: "Total price",
                                                selector: row => Math.round(row.total_amount/100),
                                                sortable: true
                                            },
                                        ]} data={klarnaData.order_lines} />
                                    </div>
                                    :<div>
                                        <h4>Order info for {data.data.post_name}</h4>

                                        Firstname: {data.data.firstName}
                                        <br/>
                                        Lastname: {data.data.lastName}
                                        <br/>
                                        OrderStatus: {data.data.orderStatus}
                                    </div>
                            }
                        </div>
                    </div>
                    :<></>
                }
        </div>
    );
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const orderid = context.params?.orderid;
    const endpoint = `http://localhost:8010/proxy/user/order/${orderid}`

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const data = await res?.json();

    return{
        props: {
            data
        }
    }
}

export default OrderDetail
