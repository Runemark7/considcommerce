export default interface KlarnaShippingOptions {
    "id": string,
    "name": string,
    "description": string,
    "promo": string,
    "price": number,
    "preselected": true,
    "tax_amount": 0,
    "tax_rate": 0,
    "shipping_method": string,
    "delivery_details": {
        "carrier": "postNord",
        "class": "string",
        "product": {
            "name": "string",
            "identifier": "string"
        },
        "timeslot": {
            "id": "string",
            "start": "string",
            "end": "string"
        },
        "pickup_location": {
            "id": string,
            "name": string,
            "address": {
                "given_name": string,
                "family_name": string,
                "organization_name": "MyCompany",
                "email": string,
                "street_address": string,
                "street_name": string,
                "street_number": string,
                "postal_code": string,
                "city": string,
                "region": "SE",
                "phone": string,
                "country": "SE",
                "care_of": "C/O",
            }
        }
    },
    "selected_addons": [
        {
            "type": string,
            "price": number,
            "external_id": string,
            "user_input": string
        }
    ]
}
