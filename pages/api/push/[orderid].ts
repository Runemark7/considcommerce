import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {orderid} = req.query

    const endpoint = "http://localhost:8010/proxy/api/update/order"

    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            "Cookie": req.headers.cookie!
        }),
        body: JSON.stringify(JSON.stringify({"klarnaOrderId": orderid}))
    }

    const response = await fetch(endpoint,options);

    if (response.ok) {
        const data = await response.json();
        return res.status(200).json({"msg": data })
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}




