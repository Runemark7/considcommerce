import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DataTable from "react-data-table-component";

const OrderDetail = () => {
    const router = useRouter()
    const { orderid } = router.query

    // @ts-ignore
    const user = useSelector((state)=>(state.user))

    const [data, setData] = useState(null);
    const [klarnaData, setKlarnaData] = useState(null);

    useEffect(()=>{
        if (!user.loggedIn) {
            router.push("/login")
        }else{
            const endpoint = `http://localhost:8010/proxy/user/order/${orderid}`

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + user.jwtToken,
                },
            }

            fetch(endpoint, options)
                .then(resp=>{
                    if (resp.ok){
                        return resp.json()
                    }
                })
                .then(data => {
                    setData(data)
                })
        }
    }, [user])

    useEffect(()=>{
        if (data && data.payment_method == "klarnaCheckout" && data.klarna_order_id != null){
            const order_id = data.klarna_order_id;

            const endpoint = `https://api.playground.klarna.com/checkout/v3/orders/${order_id}`

            const options = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + window.btoa('PK64251_9ae70e07d814:GwxiSlLjCLj8t8B3'),
                },
            }

            fetch(endpoint, options)
                .then(resp=>{
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
                {(data) ?
                    <div>
                        {data.post_name}

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
                                        :<></>
                                }
                            </div>
                    </div>



                    :<></>
                }
        </div>
    );
}

export default OrderDetail
