import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function SearchBar() {

    const router = useRouter()

    const [searchValue, setSearchValue] = useState("")


    const onTextChange = (e:FormEvent) => {
        setSearchValue(e.target.value)
    }

    const searchForValue = () => {
        router.push(`/search/${searchValue}`)
    }

    return (
        <div>
            <input type="search" name={"search"} onChange={onTextChange} />
            <button onClick={searchForValue}>
               Search
            </button>
        </div>
    )
}
