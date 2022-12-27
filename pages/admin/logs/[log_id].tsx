import type {GetServerSidePropsContext, NextPage} from 'next'


const AdminIndexSingleLog: NextPage = (props: any) => {

    return (
        <div>
            <h1>Single log</h1>

            <div>
                <h3>Log info</h3>
                <p>Log id: {props.log_id}</p>
                <p>Log Date: {props.log_date}</p>
                <p>Log Text: {props.log_text}</p>
                <p>Log Type: {props.log_type}</p>
                <p>Log User: {props.log_user}</p>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
    const log_id = context.params?.log_id;
    const endpoint = `http://localhost:8010/proxy/log/get/${log_id}`

    const options = {
        method: 'GET',
        credentials: "include",
        headers: {
            "Cookie": context.req.headers.cookie!
        }
    }

    const res = await fetch(endpoint, options);
    const logData = await res?.json();

    return {
        props: logData
    }
}

export default AdminIndexSingleLog
