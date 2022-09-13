import {FormEvent} from "react";

export default function Shipping() {

    return (
        <div onChange={(event)=>{
            addShippingFee(event)
        }}>
            <input type="radio" name="shippingOption" value={"Free"} />Free
            <input type="radio" name="shippingOption" value={"Normal"} />Normal
            <input type="radio" name="shippingOption" value={"Fast"} />Fast
        </div>
    )
}

function addShippingFee(event: FormEvent){
    console.log("shipping")
}
