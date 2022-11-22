// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const klarnaId = req.query.id;
    console.log("here")

    const shipping_options = [
        {
            "id": "id-1070",
            "type": "postal",
            "carrier": "postnord",
            "name": "Postal delivery",
            "price": 0,
            "tax_rate": 0,
            "delivery_time": {
                "interval": {
                    "earliest": 4,
                    "latest": 6
                }
            },
            "class": "standard"
        }
    ]

    res.status(200).json(
        { shipping_options }
    )
}
