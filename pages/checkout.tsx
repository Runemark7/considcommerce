import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
import Product from "../models/Product";
import Shipping from "../components/modules/shipping";
import {useRouter} from "next/router";


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

    const router = useRouter()

    const checkoutHandler = (event: FormEvent, products:Product[], userId:number) => {
        event.preventDefault()

        // @ts-ignore
        const data = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            userId: userId,
            products: products
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = "http://localhost:8010/proxy/api/order"

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.jwtToken,
            },
            body: JSONdata
        }

        fetch(endpoint, options)
            .then(resp=>resp.json())
            .then(data => {
                const orderId = data.orderId;
                router.push({
                    pathname: "/thankyou/"+orderId,
                })
            })
    }


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
                    <p>Choose shippingCost</p>
                    <Shipping />
                </div>
                <div>
                    <p>
                        totalprice: {Math.round(orderData.totalprice*100)/100}
                    </p>
                </div>
            </div>


        </div>
    )
}

/* for later :D
                <label htmlFor="country">Country</label>
                <input type="text" name="country" id="country" className={"inputField"} required/>

                <label htmlFor="streetName">Street name</label>
                <input type="text" name="streetName" id="streetName" className={"inputField"} required/>

                <label htmlFor="postalCode">Postal code</label>
                <input type="text" name="postalCode" id="postalCode" className={"inputField"} required/>

                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" className={"inputField"} required/>

                <label htmlFor="phoneNumber">Telephone</label>
                <input type="text" name="phoneNumber" id="phoneNumber" className={"inputField"} required/>

                <label htmlFor="emailAdress">Email</label>
                <input type="text" name="emailAdress" id="emailAdress" className={"inputField"} required/>
 */

export default Checkout
