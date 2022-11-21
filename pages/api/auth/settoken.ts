import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'js-cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies["jwtToken"]

    const options = {
        method: 'POST',
        headers:{
            'Authorization': 'Bearer ' + token,
        },
    }

    fetch("http://localhost:8010/proxy/api/refresh", options)
        .then((resp)=>{
            if (resp.ok){
                return resp.json()
            }
        })
        .then((handledResp)=>{
            req.cookies["jwtToken"] = handledResp.access_token
            Cookies.set("jwtToken", handledResp.access_token)
        })

    return res.status(200).json({"token": token })
}
