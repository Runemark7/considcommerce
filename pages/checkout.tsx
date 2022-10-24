import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
import Product from "../models/Product";

type ServicePoint = {
    name: string,
    servicePointId: string
    deliveryAddress: {
        city: string,
        streetName: string,
        streetNumber: string,
        postalCode: string
    },
    openingHours: {
        postalServices: []
    },
    phoneNoToCashRegister: string
}

type OpeningHours = {
    closeDay : string
    closeTime : string
    openDay : string
    openTime : string
}


const Checkout = () => {

    // @ts-ignore
    const data = useSelector((state)=>(state.cart))

    const [orderData, setOrderData] = useState(data);

    useEffect(()=>{
        setOrderData(data)
    }, [data.totalprice])

    // @ts-ignore
    const user = useSelector((state)=>(state.user))

    const [callbackHTML, setCallbackHTML] = useState();
    const checkoutHandler = (event: FormEvent, products:Product[], userId:number) => {
        event.preventDefault()

        const data = {
            "purchase_country": "se",
            "purchase_currency": "SEK",
            "locale": "sv-SE",
            "order_amount": 50000,
            "order_tax_amount": 4545,
            "order_lines": [
                {
                    "type": "physical",
                    "reference": "19-402-USA",
                    "name": "Red T-Shirt",
                    "quantity": 5,
                    "quantity_unit": "pcs",
                    "unit_price": 10000,
                    "tax_rate": 1000,
                    "total_amount": 50000,
                    "total_discount_amount": 0,
                    "total_tax_amount": 4545
                }
            ],
            "shipping_options": [
                {
                    "id": "express_priority",
                    "name": "NEXT DAY 0-1 Days",
                    "description": "Delivery by 4:30 pm",
                    "promo": "Christmas Promotion",
                    "price": 50,
                    "preselected": true,
                    "tax_amount": 0,
                    "tax_rate": 0,
                    "shipping_method": "PickUpStore",
                    "delivery_details": {
                        "carrier": "string",
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
                            "id": "string",
                            "name": "string",
                            "address": {
                                "given_name": "John",
                                "family_name": "Doe",
                                "organization_name": "string",
                                "email": "john@doe.com",
                                "title": "Mr",
                                "street_address": "Lombard St 10",
                                "street_address2": "Apt 214",
                                "street_name": "Lombard St",
                                "street_number": "10",
                                "house_extension": "B",
                                "postal_code": "90210",
                                "city": "Beverly Hills",
                                "region": "CA",
                                "phone": "333444555",
                                "country": "US",
                                "care_of": "C/O",
                            }
                        }
                    },
                    "selected_addons": [
                        {
                            "type": "string",
                            "price": 50,
                            "external_id": "string",
                            "user_input": "string"
                        }
                    ]
                }
            ],
            "merchant_urls": {
                "terms": "http://localhost:3000/terms",
                "checkout": "http://localhost:3000/checkout",
                "confirmation": "http://localhost:3000/thankyou/{checkout.order.id}",
                "push": "http://localhost:3000/api/push"
            }
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = "https://api.playground.klarna.com/checkout/v3/orders"

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa('PK64251_9ae70e07d814:GwxiSlLjCLj8t8B3'),
            },
            body: JSONdata
        }

        fetch(endpoint, options)
            .then(resp=>{
                if (resp.ok){
                    return resp.json()
                }
            })
            .then(data => {
                setCallbackHTML(data.html_snippet)

                //create order in our database
                 const formData = {
                    firstName: event.target.firstName.value,
                    lastName: event.target.lastName.value,
                    userId: userId,
                     klarna_order_id: data.order_id,
                     klarna_order_amount: data.order_amount
                }

                const fromFormDataToJSON = JSON.stringify(formData);

                const endpoint = "http://localhost:8010/proxy/api/order"

                const options = {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.jwtToken,
                    },
                    body: fromFormDataToJSON
                }

                fetch(endpoint, options)
                    .then(resp=>{
                        if (resp.ok){
                            return resp.json()
                        }
                    })
                    .then(data => {
                        console.log(data)
                    })
            })
    }

    useEffect(()=>{
        if (callbackHTML){
            var checkoutContainer = document.getElementById('my-checkout-container')
            checkoutContainer.innerHTML = callbackHTML.replace(/\\"/g, "\"").replace(/\\n/g, "");
            var scriptsTags = checkoutContainer.getElementsByTagName('script')
            for (var i = 0; i < scriptsTags.length; i++) {
                var parentNode = scriptsTags[i].parentNode
                var newScriptTag = document.createElement('script')
                newScriptTag.type = 'text/javascript'
                newScriptTag.text = scriptsTags[i].text
                parentNode.removeChild(scriptsTags[i])
                parentNode.appendChild(newScriptTag)
            }
        }
    }, [callbackHTML])


    const [servicePoints, setServicePoints] = useState([]);

    const [addressEndpoint, setAddressEndpoint] = useState({
        deliveryAddress: "",
        postalCode: "",
        cityName: "",
        countryCode: ""
    });

    const checkDeliveryAddress = (value:string, stringKey: String) => {
        let copyObj = {...addressEndpoint}
        switch (stringKey){
            case "deliveryAddress":
                copyObj.deliveryAddress = value;
                break;
            case "postalCode":
                copyObj.postalCode = value;
                break;
            case "cityName":
                copyObj.cityName = value;
                break;
            case "countryCode":
                copyObj.countryCode = value;
                break;
        }
        setAddressEndpoint(obj => ({
            ...copyObj
        }))
    }

    useEffect(()=>{
        if (addressEndpoint.deliveryAddress, addressEndpoint.postalCode, addressEndpoint.cityName, addressEndpoint.countryCode){
            const endpoint = 'https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress?' +
                'returnType=json&' +
                'countryCode=SE&' +
                `agreementCountry=${addressEndpoint.countryCode}&` +
                `city=${addressEndpoint.cityName}&` +
                `postalCode=${addressEndpoint.postalCode}&` +
                `streetName=${addressEndpoint.deliveryAddress}&` +
                'numberOfServicePoints=5&srId=EPSG%3A4326&context=optionalservicepoint&responseFilter=public&typeId=24%2C25%2C54&apikey=50f1dbd11731869229f07cae6dd75627'

            fetch(endpoint).then(resp=>{
                if (resp.ok){
                    return resp.json()
                }
            }).then(data => {
                if (data.servicePointInformationResponse){
                    setServicePoints(data.servicePointInformationResponse.servicePoints)
                }
            })
        }
    }, [addressEndpoint])

    return(
        <div className={"formWrapper fifty-fiftyCols"} >
            <div className={"fifty-fifty-left"}>
                <form className={"formHolder"} onSubmit={
                    (e)=>{
                        checkoutHandler(e, orderData.products, user.userId);
                    }}>
                    <label htmlFor="firstName">FirstName*</label>
                    <input type="text" name="firstName" id="firstName" className={"inputField"} required/>

                    <label htmlFor="lastName">LastName*</label>
                    <input type="text" name="lastName" id="lastName" className={"inputField"} required/>

                    <label htmlFor="deliveryAddress">DeliveryAddress*</label>
                    <input type="text" name="deliveryddress" id="deliveryAddress" onChange={(e:FormEvent)=>{
                        checkDeliveryAddress(e.target.value, "deliveryAddress")
                    }} className={"inputField"} required/>

                    <label htmlFor="cityName">City*</label>
                    <input type="text" name="cityName" id="cityName" onChange={(e:FormEvent)=>{
                        checkDeliveryAddress(e.target.value, "cityName")
                    }} className={"inputField"} required/>

                    <label htmlFor="postalCode">PostalCode*</label>
                    <input type="text" name="postalCode" id="postalCode" onChange={(e:FormEvent)=>{
                        checkDeliveryAddress(e.target.value, "postalCode")
                    }} className={"inputField"} required/>

                    <select onChange={(e:FormEvent)=>{
                        checkDeliveryAddress(e.target.value, "countryCode")
                    }}>
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="SE">Sweden</option>
                    </select>

                    <button type="submit">Make order</button>
                </form>
            </div>

            <div className={"fifty-fifty-right"}>
                {orderData.products.map((product: Product) => (
                    <div className={"checkoutItemWrapper"} key={product.post_id}>
                        <div className={"checkoutItem"}>
                            <p className={"productTitle"}>{product.post_name}</p>
                            <p className={"productPrice"}>{product.product_price}</p>
                            <p>{product.product_quantity}x{product.product_price} = {Math.round((parseInt(product.product_price) * product.product_quantity)*100)/100}</p>
                        </div>
                    </div>
                ))}
                <div>
                    {(servicePoints)?
                        servicePoints.map((servicepoints:ServicePoint)=>(
                            <div key={servicepoints.servicePointId}>
                                <h3>
                                    {servicepoints.name}
                                </h3>

                                <div>
                                    {servicepoints.deliveryAddress.city}
                                    {servicepoints.deliveryAddress.postalCode}
                                    {servicepoints.deliveryAddress.streetName}
                                    {servicepoints.deliveryAddress.streetNumber}
                                </div>

                                <article>
                                    <h4>
                                        Open hours
                                    </h4>
                                    <p>
                                        {servicepoints.openingHours.postalServices.map((hours: OpeningHours)=>(
                                            <div>
                                                {hours.closeDay}
                                                {hours.closeTime}
                                                {hours.openDay}
                                                {hours.openTime}
                                            </div>
                                        ))}
                                    </p>
                                </article>
                            </div>
                        ))
                        :<div>No servicepoints for this address</div>}
                </div>
                <div>
                    <p>
                        totalprice: {Math.round(orderData.totalprice*100)/100}
                    </p>
                </div>
            </div>

            <div id={"my-checkout-container"}></div>


        </div>
    )
}

export default Checkout


