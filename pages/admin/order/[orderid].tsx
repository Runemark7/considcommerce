import type {GetServerSidePropsContext, NextPage} from 'next'

const AdminUpdateSingleOrder: NextPage = (props: any) => {

    return (
        <div>
            <h1>Order</h1>

            <div>
                <h3>Post info</h3>
                orderId: {props.post_id}
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
        props: postData
    }
}

export default AdminUpdateSingleOrder
