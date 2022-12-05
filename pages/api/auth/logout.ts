import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST"){
        return res.status(405).json({"msg": "something went wrong"})
    }

    if (!req.body){
        return res.status(405).json({"msg": "something went wrong"})
    }

    const endpoint = "http://localhost:8010/proxy/logout"

    const options = {
        method: 'POST',
        credentials: "same-origin"
    }

    const response = await fetch(endpoint, options);

    if (response.ok){
        return res.status(200).json({"data": "all good here!" })
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}