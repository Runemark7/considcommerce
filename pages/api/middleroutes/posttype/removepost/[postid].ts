import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "DELETE"){
        return res.status(403).json({"msg": "something went wrong" })
    }

    const {postid} = req.query

    const endpoint = `http://localhost:8010/proxy/api/post/remove/${postid}`

    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            "Cookie": req.headers.cookie!
        }),
    }

    const response = await fetch(endpoint,options);

    if (response.ok) {
        const data = await response.json();
        return res.status(200).json({"msg": data })
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}




