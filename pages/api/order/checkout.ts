import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = req.body;

    console.log("body", body);

    if (!body.firstName || !body.lastName){
        return res.status(400).json({error:"First or lastname was not found!"})
    }

    //create order and send to mail
    res.status(200).json({ body })
}
