import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST"){
        return res.status(405).json({"msg": "something went wrong"})
    }

    if (!req.body){
        return res.status(405).json({"msg": "something went wrong"})
    }

    const endpoint = "http://localhost:8010/proxy/auth/cookie/login"

    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Expose-Headers", "Set-Cookie")
    res.setHeader("Access-Control-Allow-Origin", "*")

    const response = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers(
            {
                'Content-Type': 'application/json',
            }
        ),
        body: JSON.stringify(req.body)
    });

    if (response.ok){
        const data = await response.json();
        const headers = await response.headers;
        let setCookies = (headers as any).raw()["set-cookie"]
        if(setCookies){
            setCookies.forEach((setcookie:string)=>{
                res.setHeader("set-cookie", setcookie)
            })
            return res.status(200).json({"data": data })
        }else{
            return res.status(401).json({"msg": "something went wrong" })
        }
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}




