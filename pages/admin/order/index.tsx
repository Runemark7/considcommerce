import type {GetServerSidePropsContext, NextPage} from 'next'
import DataTable from "react-data-table-component";
import Link from "next/link";

const AdminOrderIndex: NextPage = (props: any) => {

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
                data={props.orders}
                highlightOnHover={true}
                striped={true}
                pointerOnHover={true} />
        </div>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const endpoint = `http://localhost:8010/proxy/api/posttype/order`;

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const orders = await res?.json();

    return {
        props: {
            orders
        }
    }
}

export default AdminOrderIndex
