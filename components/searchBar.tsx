import {FormEvent, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {fetchData} from "../core/fetchDataHelper";
import Link from "next/link";

export default function SearchBar() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [myState, setMyState] = useState(false);

    const router = useRouter()

    const [searchValue, setSearchValue] = useState("")

    const [searchResults, setSearchResult] = useState([])

    const onTextChange = (e:FormEvent) => {
        if (e.target.value == ""){
            setMyState(false)
        }
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
                setMyState(true)
                setSearchResult(data)
            }else{
                setSearchResult([])
            }
        }
        if (searchValue != ""){
            getData()
        }
    }, [searchValue])

    const searchForValue = () => {
        router.push(`/search/${searchValue}`)
    }

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                setMyState(true)
                return;
            }

            setMyState(false);
        };
        document.addEventListener("click", listener, { capture: false });
        return () => {
            document.removeEventListener("click", listener, { capture: false });
        };
    }, []);


    return (
        <div className={"searchBar"} ref={ref}>
            <input type="search" name={"search"} onChange={onTextChange} />
            <div className={`searchResults ${(myState)?"showDiv":"hideDiv"}`}>
                <ul>
                    {(searchResults)?searchResults.map((post:any)=>(
                            (post.post_type != "page")?
                                <li>
                                    <Link href={`http://localhost:3000/${post.post_type}/${post.post_slug}`} onClick={()=>{
                                        setMyState(false)
                                    }} >
                                        {post.post_name}
                                    </Link>
                                </li>
                                :
                                <li>
                                    <Link href={`http://localhost:3000/${post.post_slug}`} onClick={()=>{
                                        setMyState(false)
                                    }} >
                                        {post.post_name}
                                    </Link>
                                </li>
                    )):
                        <li>
                            No results found for {searchValue}
                        </li>
                    }
                </ul>
            </div>
            <button onClick={searchForValue}>
                <img className={"icon"} src={"/icons/magnifier.svg"} alt="searchIcon"/>
            </button>
        </div>
    )
}
