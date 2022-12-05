import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST"){
        return res.status(405).json({"msg": "something went wrong"})
    }

    if (!req.body){
        return res.status(405).json({"msg": "something went wrong"})
    }

    const endpoint = `http://localhost:8010/proxy/api/posttype/model/update`

    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            "Cookie": req.headers.cookie!
        }),
        body: JSON.stringify(req.body)
    }

    const response = await fetch(endpoint,options);

    if (response.ok) {
        const data = await response.json();
        return res.status(200).json({"msg": data })
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}




