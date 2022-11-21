import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {fetchData} from "../core/fetchDataHelper";
import Link from "next/link";

export default function SearchBar() {

    const router = useRouter()

    const [searchValue, setSearchValue] = useState("")

    const [searchResults, setSearchResult] = useState([])

    const onTextChange = (e:FormEvent) => {
        setSearchValue(e.target.value)

    }

    useEffect(()=>{
        async function getData(){
          const data = await fetchData({
            body: undefined,
            endpoint: `/api/search/${searchValue}`,
            headers: "",
            method: "GET",
            token: ""
          })
            if (data){
                setSearchResult(data)
            }
        }
        getData()
    }, [searchValue])

    const searchForValue = () => {
        router.push(`/search/${searchValue}`)
    }

    return (
        <div className={"searchBar"}>
            <input type="search" name={"search"} onChange={onTextChange} />
            <div className={"searchResults"}>
                {(searchResults)?searchResults.map((post:any)=>(
                    <div>
                        <Link href={`http://localhost:3000/${post.post_slug}`}>
                            {post.post_name}
                        </Link>
                    </div>
                )):
                <>
                </>}
            </div>
            <button onClick={searchForValue}>
                <img className={"icon"} src={"/icons/magnifier.svg"} alt="searchIcon"/>
            </button>
        </div>
    )
}
