import type { NextPage } from 'next'
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import Link from "next/link";

const AdminOrderIndex: NextPage = () => {
    const [logs, setLogs] = useState([]);

    useEffect(()=>{
        async function getData(){
            const endpoint = `http://localhost:8010/proxy/log/getall`;
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
                    setLogs(data)
                })
            }catch {
                setLogs([])
            }
        }

        getData()
    }, [])

    return (
        <div>
            <h1>Orders</h1>
            <DataTable
                columns={[
                    {
                        name: "Log id",
                        selector: ({log_id}) => log_id,
                        sortable: true
                    },
                    {
                        name: "Log date",
                        selector: ({log_date}) => log_date
                    },
                    {
                        name: "Log text",
                        selector: ({log_text}) => log_text,
                        sortable: true
                    },
                    {
                        name: "Log type",
                        selector: ({log_type}) => log_type
                    },
                    {
                        name: "Userid",
                        selector: ({log_user}) => log_user
                    },
                    {
                        cell: ({log_id}, index, column, id) => {
                            return (
                                <Link href={`http://localhost:3000/admin/logs/${log_id}`}>
                                    <button>
                                        Change
                                    </button>
                                </Link>
                            )
                        }
                    }
                ]}
                pagination={true}
                data={logs}
                highlightOnHover={true}
                striped={true}
                pointerOnHover={true} />
        </div>
    )
}

export default AdminOrderIndex
