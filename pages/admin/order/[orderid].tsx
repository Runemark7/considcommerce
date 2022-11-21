import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'

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


export const getStaticProps: GetStaticProps = async ({params}) => {
    // @ts-ignore
    const orderid = params.orderid

    const data = await fetch(`http://localhost:8010/proxy/api/post/postid/${orderid}`);
    const postData = await data.json();
    return {
        props: postData
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default AdminUpdateSingleOrder
