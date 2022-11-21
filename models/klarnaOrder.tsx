import KlarnaOrderProduct from "./klarnaOrderProduct";
import KlarnaShippingOptions from "./klarnaShippingOptions";

export default interface KlarnaOrder {
    "purchase_country": "se",
    "purchase_currency": "SEK",
    "locale": "sv-SE",
    "order_amount": number,
    "order_tax_amount": 0,
    "order_lines": KlarnaOrderProduct[],
    "shipping_options": KlarnaShippingOptions[],
    "merchant_urls": {
        "terms": "http://localhost:3000/terms",
        "checkout": "http://localhost:3000/checkout",
        "confirmation": "http://localhost:3000/thankyou/{checkout.order.id}",
        "push": "http://localhost:3000/api/push",
        "shipping_option_update": string
    },
    options: any
}


