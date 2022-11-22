import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'

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


export const getStaticProps: GetStaticProps = async ({params}) => {
    // @ts-ignore
    const log_id = params.log_id

    const data = await fetch(`http://localhost:8010/proxy/log/get/${log_id}`);
    const logData = await data.json();
    return {
        props: logData
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default AdminIndexSingleLog
