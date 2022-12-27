import type {GetServerSidePropsContext, NextPage} from 'next'
import DataTable from "react-data-table-component";
import Link from "next/link";

const AdminLogsIndex: NextPage = (props: any) => {
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
                data={props.logs}
                highlightOnHover={true}
                striped={true}
                pointerOnHover={true} />
        </div>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const endpoint = `http://localhost:8010/proxy/log/getall`;

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const logs = await res?.json();

    return {
        props: {
            logs
        }
    }
}

export default AdminLogsIndex
