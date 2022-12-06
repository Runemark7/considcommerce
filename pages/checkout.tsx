import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
import Product from "../models/Product";
import KlarnaOrder from "../models/klarnaOrder";
import KlarnaOrderProduct from "../models/klarnaOrderProduct";
import KlarnaShippingOptions from "../models/klarnaShippingOptions";
import DataTable from "react-data-table-component";

const Checkout = () => {

    // @ts-ignore
    const cart = useSelector((state)=>(state.cart))

    const [orderData, setOrderData] = useState(cart);

    useEffect(()=>{
        setOrderData(cart)
    }, [cart.totalprice])

    // @ts-ignore
    const user = useSelector((state)=>(state.user))

    const [callbackHTML, setCallbackHTML] = useState();
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    const checkoutHandler = (event: FormEvent, products:Product[], userId:number) => {
        event.preventDefault()

        let orderLines: KlarnaOrderProduct[] = [];

        products.map((product: Product)=>{
            const totalPrice:number = (Number(product.product_price)*product.product_quantity)*100;

            const klarnaProduct :KlarnaOrderProduct = {
                quantity_unit: "pcs", tax_rate: 0, total_discount_amount: 0, total_tax_amount: 0,reference: "",
                name: product.post_name,
                quantity: product.product_quantity,
                total_amount: totalPrice,
                type: "physical",
                unit_price: Number(product.product_price)*100
            }

            orderLines.push(klarnaProduct)
        })


        const shippingOptions: KlarnaShippingOptions[] = [
            /*{
                "id": "id-1070",
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
            }*/
        ]

        deliveryOptions.map((deliveryOption: any)=>{

            let singleShippingOption: KlarnaShippingOptions = {
                tms_reference: "",
                delivery_details: {
                    carrier: "postNord",
                    class: "string",
                    pickup_location: {
                        address: {
                            care_of: "C/O",
                            city: "",
                            country: "SE",
                            email: "",
                            family_name: "",
                            given_name: "",
                            organization_name: "MyCompany",
                            phone: "",
                            postal_code: "",
                            region: "SE",
                            street_address: "",
                            street_name: "",
                            street_number: ""
                        }, id: "", name: ""
                    },
                    product: {identifier: "string", name: "string"},
                    timeslot: {end: "string", id: "string", start: "string"}
                },
                description: "",
                id: "",
                name: "",
                preselected: true,
                price: 0,
                promo: "",
                selected_addons: [{external_id: "", price: 0, type: "", user_input: ""}],
                shipping_method: "",
                tax_amount: 0,
                tax_rate: 0
            }

            if(deliveryOption.type == "service-point"){
                if(deliveryOption.deliveryOptions.length > 1)
                {
                    deliveryOption.deliveryOptions.map((localSingleShippingOption: any)=>{
                        let singleSingleShippingOption: KlarnaShippingOptions = {
                            delivery_details: {
                                carrier: "postNord",
                                class: "string",
                                pickup_location: {
                                    address: {
                                        care_of: "C/O",
                                        city: "",
                                        country: "SE",
                                        email: "",
                                        family_name: "",
                                        given_name: "",
                                        organization_name: "MyCompany",
                                        phone: "",
                                        postal_code: "",
                                        region: "SE",
                                        street_address: "",
                                        street_name: "",
                                        street_number: ""
                                    }, id: "", name: ""
                                },
                                product: {identifier: "string", name: "string"},
                                timeslot: {end: "string", id: "string", start: "string"}
                            },
                            description: "",
                            id: "",
                            name: "",
                            preselected: true,
                            price: 0,
                            promo: "",
                            selected_addons: [{external_id: "", price: 0, type: "", user_input: ""}],
                            shipping_method: "",
                            tax_amount: 0,
                            tax_rate: 0
                        }
                        singleSingleShippingOption.delivery_details.pickup_location.address.street_name = localSingleShippingOption.location.address.streetName
                        singleSingleShippingOption.delivery_details.pickup_location.address.street_number = localSingleShippingOption.location.address.streetNumber
                        singleSingleShippingOption.delivery_details.pickup_location.address.city = localSingleShippingOption.location.address.city
                        singleSingleShippingOption.delivery_details.pickup_location.address.postal_code = localSingleShippingOption.location.address.postCode
                        singleSingleShippingOption.delivery_details.pickup_location.name = localSingleShippingOption.location.name
                        singleSingleShippingOption.delivery_details.pickup_location.id = localSingleShippingOption.location.id

                        singleSingleShippingOption.name = localSingleShippingOption.serviceInfo.serviceName + " - " + localSingleShippingOption.location.name

                        singleSingleShippingOption.description = localSingleShippingOption.timeOfDelivery.dayInterval + " days"

                        singleSingleShippingOption.price = 2500

                        shippingOptions.push(singleSingleShippingOption)
                    })
                }else{
                    singleShippingOption.id = deliveryOption.deliveryOptions[0].id;

                    //pickup_location
                    singleShippingOption.delivery_details.pickup_location.address.street_name = deliveryOption.deliveryOptions[0].location.address.streetName
                    singleShippingOption.delivery_details.pickup_location.address.street_number = deliveryOption.deliveryOptions[0].location.address.streetNumber
                    singleShippingOption.delivery_details.pickup_location.address.city = deliveryOption.deliveryOptions[0].location.address.city
                    singleShippingOption.delivery_details.pickup_location.address.postal_code = deliveryOption.deliveryOptions[0].location.address.postCode
                    singleShippingOption.delivery_details.pickup_location.name = deliveryOption.deliveryOptions[0].location.name
                    singleShippingOption.delivery_details.pickup_location.id = deliveryOption.deliveryOptions[0].location.id

                    singleShippingOption.name = deliveryOption.deliveryOptions[0].serviceInfo.serviceName + " - " + deliveryOption.deliveryOptions[0].location.name

                    singleShippingOption.description = deliveryOption.deliveryOptions[0].timeOfDelivery.dayInterval + " days"

                    singleShippingOption.price = 2500
                    shippingOptions.push(singleShippingOption)
                }
            }else if(deliveryOption.type == "home"){
                singleShippingOption.id = deliveryOption.deliveryOptions[0].id;

                singleShippingOption.name = deliveryOption.deliveryOptions[0].serviceInfo.serviceName

                singleShippingOption.description = deliveryOption.deliveryOptions[0].timeOfDelivery.dayInterval + " days"

                singleShippingOption.price = 5000
                shippingOptions.push(singleShippingOption)
            }
        })

        const data:KlarnaOrder = {
            locale: "sv-SE",
            merchant_urls: {
                checkout: "http://localhost:3000/checkout",
                confirmation: "http://localhost:3000/thankyou/{checkout.order.id}",
                push: "http://localhost:3000/api/push",
                terms: "http://localhost:3000/terms",
            },
            shipping_options: shippingOptions,
            order_lines: orderLines,
            order_tax_amount: 0,
            purchase_country: "se",
            purchase_currency: "SEK",
            order_amount:cart.totalprice*100,
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
                console.log(resp)
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
                    userId: (user.jwtToken)?userId:0,
                    klarna_order_id: data.order_id,
                    klarna_order_amount: data.order_amount
                }
                const fromFormDataToJSON = JSON.stringify(formData);
                const endpointAfter = "http://localhost:3000/api/middleroutes/createorder"
                const optionstwo = {
                    method: 'POST',
                    body: fromFormDataToJSON
                }

                fetch(endpointAfter, optionstwo)
                    .then(resp=>{
                    })
                    .then(data => {
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

    const [addressEndpoint, setAddressEndpoint] = useState({
        firstName: "",
        secondName: "",
        deliveryAddress: "",
        postalCode: "",
        cityName: "",
        countryCode: ""
    });

    const checkDeliveryAddress = (value:string, stringKey: String) => {
        let copyObj = {...addressEndpoint}
        switch (stringKey){
            case "firstName":
                copyObj.firstName = value;
                break;
            case "secondName":
                copyObj.secondName = value;
                break;
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
        if (addressEndpoint.deliveryAddress && addressEndpoint.postalCode && addressEndpoint.cityName && addressEndpoint.countryCode) {
            const postData = {
                "customer": {
                    "customerId": "string"
                },
                "warehouses": [
                    {
                        "id": "PK64251",
                        "address": {
                            "countryCode": "SE",
                            "postCode": "30227",
                            "city": "Halmstad",
                            "street": "Waldemar Lorentzons gata 3",
                        },
                        "pickAndPackTime": 0,
                    }
                ],
                "recipientAddress": {
                    "countryCode": addressEndpoint.countryCode,
                    "postCode": addressEndpoint.postalCode,
                    "city": addressEndpoint.cityName,
                    "street": addressEndpoint.deliveryAddress,
                },
                "parcelInfo": {
                    "length": 130,
                    "width": 270,
                    "height": 100,
                    "weight": 145,
                    "temperatureRange": {
                        "lowest": 0,
                        "highest": 0
                    },
                    "valuableGoods": false
                },
                "filter": {
                    "allowFilters": {
                        "deliveryType": [
                            "home",
                            "service-point"
                        ]
                    }
                }
            }

            const endpoint = "https://atapi2.postnord.com/rest/shipment/v1/deliveryoptions/bywarehouse?apikey=50f1dbd11731869229f07cae6dd75627"
            const JSONdata = JSON.stringify(postData);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + window.btoa('PK64251_9ae70e07d814:GwxiSlLjCLj8t8B3'),
                },
                body: JSONdata
            }

            fetch(endpoint, options).then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
            }).then(data => {
                if (data.warehouseToDeliveryOptions) {
                    if(data.warehouseToDeliveryOptions[0].deliveryOptionsPerType){
                        setDeliveryOptions(data.warehouseToDeliveryOptions[0].deliveryOptionsPerType)
                    }
                }
            })
        }
    }, [addressEndpoint])

    return(
        <div>
            <div id={"checkoutWrapper"} className={"formWrapper twocols componentWrapper fifty-fifty"} >
                <div className={"leftCol"}>
                    <h1>Checkout</h1>
                    <h3>Delivery information</h3>
                    <form className={"formHolder"} onSubmit={
                        (e)=>{
                            checkoutHandler(e, orderData.products, user.userId);
                        }}>

                        <input type="text" name="firstName" id="firstName" placeholder={"FirstName*"}  className={"inputField"} onChange={(e:FormEvent)=>{
                            checkDeliveryAddress(e.target.value, "firstName")
                        }} required/>
                        <input type="text" name="lastName" id="lastName" placeholder={"LastName*"} className={"inputField"} onChange={(e:FormEvent)=>{
                            checkDeliveryAddress(e.target.value, "secondName")
                        }} required/>
                        <input type="text" name="deliveryAddress" placeholder={"DeliveryAddress"} id="deliveryAddress" onChange={(e:FormEvent)=>{
                            checkDeliveryAddress(e.target.value, "deliveryAddress")
                        }} className={"inputField"} required/>
                        <input type="text" name="cityName" placeholder={"City*"} id="cityName" onChange={(e:FormEvent)=>{
                            checkDeliveryAddress(e.target.value, "cityName")
                        }} className={"inputField"} required/>
                        <input type="text" name="postalCode" placeholder={"PostalCode*"} id="postalCode" onChange={(e:FormEvent)=>{
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

                <div className={"rightCol"}>
                    <h3>Product details</h3>
                    <div className={"productCheckoutListing"}>
                        <DataTable
                            columns={[
                                {
                                    name: "Product name",
                                    selector: row => row.post_name,
                                    compact: true
                                },
                                {
                                    name: "Unit price",
                                    selector: row => row.product_price + " SEK",
                                    compact: true
                                },
                                {
                                    name: "Quantity",
                                    selector: row => row.product_quantity,
                                    compact: true
                                },
                                {
                                    name: "Total price",
                                    selector: row => parseInt(row.product_price)*row.product_quantity + " SEK",
                                    compact: true
                                },
                            ]} data={orderData.products}  />
                    </div>

                    <div>
                        <p>
                            totalprice: {Math.round(orderData.totalprice*100)/100}
                        </p>
                    </div>
                </div>
            </div>

            <div id={"my-checkout-container"}></div>

        </div>
    )
}

export default Checkout


