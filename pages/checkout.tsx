import {useSelector} from "react-redux";
import Link from "next/link";
import Cart from "./cart";
import {FormEvent} from "react";

const Checkout = () => {
    // @ts-ignore
    const data = useSelector((state)=>(state.cart))

    return(
        <div className={"formWrapper"} >
            <form className={"formHolder"} method="post" onSubmit={(
                e)=>{
                checkoutHandler(e);
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
                <p>
                    totalprice: {Math.round(data.totalprice*100)/100}
                </p>
            </div>
        </div>
    )
}

const checkoutHandler = (event: FormEvent) => {
    event.preventDefault()

    console.log("test");
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
