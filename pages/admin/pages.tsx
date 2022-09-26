import type {GetStaticProps, NextPage} from 'next'
import Link from "next/link";
import Post from "../../models/Post";

const AdminPages: NextPage = (data:any) => {
    return (
        <div>

            <Link href={"http://localhost:3000/admin/post/create"}>
                <button>Create post</button>
            </Link>

            {data.pages.map((page: Post) => (
                <div className={"productWrapper"} key={page.post_id}>
                    <div>
                        <p className={"productTitle"}>name: {page.post_name}</p>
                        <p className={"productPrice"}>id: {page.post_id}</p>
                        <p className={"productPrice"}>status: {page.post_status}</p>
                    </div>
                </div>
            ))}
            Pages edit
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await fetch(`http://localhost:8010/proxy/api/pages`);
    const pages = await data.json();
    return {
        props: {
            pages,
        },
    }
}

export default AdminPages
