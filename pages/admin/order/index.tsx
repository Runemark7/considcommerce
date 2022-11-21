import type { NextPage } from 'next'
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import Link from "next/link";

const AdminOrderIndex: NextPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        async function getData(){
            const endpoint = `http://localhost:8010/proxy/api/posttype/order`;
            const options = {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            }
            try{
                await fetch(endpoint, options).then((response)=>{
                    if (response.ok){
                        return response.json()
                    }
                }).then((data)=>{
                    setOrders(data)
                })
            }catch {
                setOrders([])
            }
        }

        getData()
    }, [])

    console.log(orders)

    return (
        <div>
            <h1>Orders</h1>
            <DataTable
                columns={[
                    {
                        name: "ID",
                        selector: row => row.post_id,
                        sortable: true
                    },
                    {
                        name: "Postname",
                        selector: row => row.post_name
                    },
                    {
                        name: "Status",
                        selector: row => row.orderStatus,
                        sortable: true
                    },
                    {
                        name: "Payment method",
                        selector: row => row.payment_method,
                        sortable: true
                    },
                    {
                        cell: (row,index,column,id) => {
                            return (
                                <Link href={`http://localhost:3000/admin/order/${row.post_id}`}>
                                    <button>
                                        Change
                                    </button>
                                </Link>
                            )
                        }
                    }
                ]}
                pagination={true}
                data={orders}
                highlightOnHover={true}
                striped={true}
                pointerOnHover={true} />
        </div>
    )
}

export default AdminOrderIndex
