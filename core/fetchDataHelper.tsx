import {useSelector} from "react-redux";

interface DataObj {
    endpoint: string,
    method: string,
    headers: string,
    token: string,
    body: any
}

async function fetchData (dataObj: DataObj) {
    const endpoint = "http://localhost:8010/proxy" + dataObj.endpoint

    const options = {
        method: (dataObj.method == "POST")? "POST": "GET",
        headers: {
            "Content-Type" : "application/json",
        },
    }

    if (dataObj.token){
        // @ts-ignore
        options.headers["Authorization"] = 'Bearer ' + dataObj.token;
    }

    if (dataObj.body != null){
        options.body = JSON.stringify(dataObj.body)
    }

      return await fetch(endpoint, options)
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