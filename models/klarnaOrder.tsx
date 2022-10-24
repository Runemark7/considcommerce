interface KlarnaOrderProduct {
    "type": string,
    "reference": "",
    "name": string,
    "quantity": number,
    "quantity_unit": "pcs",
    "unit_price": number,
    "tax_rate": 0,
    "total_amount": number,
    "total_discount_amount": 0,
    "total_tax_amount": 0
}

export default interface KlarnaOrder {
    "purchase_country": "se",
    "purchase_currency": "SEK",
    "locale": "sv-SE",
    "order_amount": number,
    "order_tax_amount": 0,
    "order_lines": KlarnaOrderProduct[],
    "merchant_urls": {
        "terms": "http://localhost:3000/terms",
        "checkout": "http://localhost:3000/checkout",
        "confirmation": "http://localhost:3000/confirmation",
        "push": "http://localhost:3000/api/push"
    }
}
