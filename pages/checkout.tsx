import {useSelector} from "react-redux";
import {FormEvent, useEffect, useState} from "react";
import Product from "../models/Product";
import Shipping from "../components/modules/shipping";
import {useRouter} from "next/router";

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



    return(
        <div className={"formWrapper"} >
            <form className={"formHolder"} onSubmit={
                (e)=>{
                checkoutHandler(e, orderData.products, user.userId);
            }}>
                <label htmlFor="firstName">FirstName</label>
                <input type="text" name="firstName" id="firstName" className={"inputField"} required/>

                <label htmlFor="lastName">LastName</label>
                <input type="text" name="lastName" id="lastName" className={"inputField"} required/>

                <button type="submit">Make order</button>
            </form>
            {orderData.products.map((product: any) => (
                <div className={"checkoutItemWrapper"} key={product.title}>
                    <div className={"checkoutItem"}>
                        <h3 className={"productTitle"}>{product.title}</h3>
                        <p className={"productPrice"}>{product.price}</p>
                        <p>{product.quantity}x{product.price} = {Math.round((product.price * product.quantity)*100)/100}</p>
                    </div>
                </div>
            ))}
            <div>
                <p>Choose shippingCost</p>
                <Shipping />
            </div>
            <div>
                <p>
                    totalprice: {Math.round(orderData.totalprice*100)/100}
                </p>
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
