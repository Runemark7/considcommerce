import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const endpoint = "http://localhost:8010/proxy/auth/cookie/admin"

    const response = await fetch(endpoint, {
        method: "GET",
        credentials: "same-origin",
        headers: new Headers(
            {
                "Cookie": req.headers.cookie!
            }
        ),
    });

    if (response.ok){
        return res.status(200).json({"data": "all good!"})
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}






