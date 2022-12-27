import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Expose-Headers", "Set-Cookie")
    res.setHeader("Access-Control-Allow-Origin", "*")

    const endpoint = "http://localhost:8010/proxy/logout"

    const options = {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            "Cookie": req.headers.cookie!
        }
    }

    const response = await fetch(endpoint, options);

    if (response.ok){
        res.setHeader("Set-Cookie", [
            `access_token_cookie=deleted; Max-Age=0; path=/`,
            `refresh_token_cookie=deleted; Max-Age=0; path=/`]
        )
        return res.status(200).json({"data": "all good here!" })
    }else{
        return res.status(401).json({"msg": "something went wrong" })
    }
}