import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {useRouter} from "next/router";
import Link from "next/link";
import {Exception} from "sass";
import {hooks} from "../../../_app";
import DataTable from "react-data-table-component";

const PosttypeIndex: NextPage = (data:any) => {
    const router = useRouter()
    const { type } = router.query

    return (
        <div>
            <h1>{type}(s)</h1>
            <button onClick={()=>{
                hooks.doActionOnHook(data, "product", "after", "updatePost" ,"afterAdminSubmit")
            }}>
                test
            </button>
            {(data.posts)?
                <div>
                    <DataTable
                        columns={[
                        {
                            name: "ID",
                            selector: row => row.post_id
                        },
                        {
                            name: "Postname",
                            selector: row => row.post_name
                        },
                        {
                            name: "Status",
                            selector: row => row.post_status,
                            sortable: true
                        },
                        {
                            name: "test",
                            cell: (row,index,column,id) => {
                                return (
                                    <Link href={`http://localhost:3000/admin/posttype/${type}/update/${row.post_id}`}>
                                        <button>
                                            Change
                                        </button>
                                    </Link>
                                )
                            }
                        }
                    ]} data={data.posts} highlightOnHover={true} striped={true} pointerOnHover={true} />
                </div>
                :<div>No {type}(s) was found</div>
            }
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const type = params.type;
    const endpoint = `http://localhost:8010/proxy/api/posttype/${type}`;

    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }
    let posts:any = []
    try{
        await fetch(endpoint, options).then((response)=>{
            if (response.ok){
                return response.json()
            }else{
                throw Exception
            }
        }).then((data)=>{
            posts = data
        })
        return {
            props: {
                posts,
            },
        }
    }catch {
        return {
            props: {
                posts,
            },
        }
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default PosttypeIndex
