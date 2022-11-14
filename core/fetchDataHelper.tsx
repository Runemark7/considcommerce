import {useSelector} from "react-redux";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";

interface DataObj {
    endpoint: string,
    method: string,
    headers: string,
    token: boolean,
    body: any
}

async function fetchData (dataObj: DataObj) {
    const options = {
        method: (dataObj.method == "POST")? "POST": "GET",
        headers: {
            "Content-Type" : "application/json",
        },
    }

    if (dataObj.token){
        const user = useSelector((state)=>(state.user))
        // @ts-ignore
        options.headers["Authorization"] = 'Bearer ' + user.jwtToken;
    }

    if (dataObj.body != null){
        options.body = JSON.stringify(dataObj.body)
    }

      return await fetch(dataObj.endpoint, options)
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            }else {
                throw resp.statusText
            }
        }).then((data) => {
            return data
        }).catch((err) => {
            return false
        })
}

export default fetchData