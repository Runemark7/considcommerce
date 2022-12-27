import Link from "next/link";
import {GetServerSidePropsContext} from "next";
import DataTable from "react-data-table-component";

const UserProfile = (props: any) => {
    console.log(props.data)
    return (
        <div>
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
            <div>

                <DataTable
                    columns={[
                        {
                            name: "Order name",
                            selector: ({post_name}) => post_name,
                        },
                        {
                            name: "Order status",
                            selector: ({orderStatus}) => orderStatus,
                        },
                        {
                            name: "Order payment",
                            selector: ({payment_method}) => payment_method,
                        },
                        {
                            name: "Order amount",
                            selector: ({klarna_order_amount}) => (klarna_order_amount/100) + " SEK",
                        },
                        {
                            cell: ({post_id}, index, column, id) => {
                                return (
                                    <Link href={`http://localhost:3000/profile/order/${post_id}`}>
                                        <button>
                                            Goto
                                        </button>
                                    </Link>
                                )
                            }
                        }
                    ]}
                    data={props.data}
                    highlightOnHover={true}
                    striped={true}
                    pointerOnHover={true} />
            </div>
        </div>
    );
}

export const getServerSideProps = async (context :GetServerSidePropsContext) => {
    const endpoint = "http://localhost:8010/proxy/user/orders"

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);


    if (res.ok){
        const data = await res?.json();
        return{
            props: {
                data
            }
        }
    }else{
        return{
            props: {
                data: []
            }
        }
    }

}

export default UserProfile
