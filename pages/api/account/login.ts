import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const body = req.body;

    console.log("body", body);

    //set loggedin into redux if success from the database

    if (!body.username || !body.password){
        return res.status(400).json({error:"First or lastname was not found!"})
    }





    res.status(200).json({ body })
}
