import {useSelector} from "react-redux";
import {FormEvent, useEffect} from "react";
import Product from "../models/Product";
import Shipping from "../components/modules/shipping";

const Checkout = () => {
    // @ts-ignore
    const data = useSelector((state)=>(state.cart))

    // @ts-ignore
    const user = useSelector((state)=>(state.user))

    useEffect(()=>{


    }, [data,user])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const data = {
            username: e.target.email.value,
            password: e.target.password.value,
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = "http://localhost:8010/proxy/auth/token"

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }

        await fetch(endpoint, options)
            .then(resp=>resp.json())
            .then(data => {
                //TODO: redirect to thank-you page
                console.log(data)
            })
    }




    return(
        <div className={"formWrapper"} >
            <form className={"formHolder"} method="post" onSubmit={
                (e)=>{
                checkoutHandler(e, data.products);
            }}>
                <label htmlFor="firstName">FirstName</label>
                <input type="text" name="firstName" id="firstName" className={"inputField"} required/>

                <label htmlFor="lastName">LastName</label>
                <input type="text" name="lastName" id="lastName" className={"inputField"} required/>

                <button type="submit">Make order</button>
            </form>
            {data.products.map((product: any) => (
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
                    totalprice: {Math.round(data.totalprice*100)/100}
                </p>
            </div>
        </div>
    )
}

const checkoutHandler = async (event: FormEvent, products:Product[]) => {
    event.preventDefault()

    // @ts-ignore
    const data = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        products: products
    }

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/order/checkout"

    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSONdata
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

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
