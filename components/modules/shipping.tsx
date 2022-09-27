import {FormEvent, useState} from "react";
import {addShippingCost} from "../../store/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import ShippingOption from "../../models/shippingOption";

export default function Shipping() {

    // @ts-ignore
    const orderData = useSelector((state)=>(state.cart))

    const [shippingCost, setShippingCost] = useState(0);

    const dispatch = useDispatch();

    const handleOnChange = (e :FormEvent) => {
        const shippingOption = e.target.value;

        const shippingObj: ShippingOption = {
            shippingName: "",
            shippingEstimateDelivery: "",
            shippingCost: 0
        }

        switch (shippingOption){
            case "free":
                shippingObj.shippingName = "free";
                shippingObj.shippingEstimateDelivery = "5-7";
                shippingObj.shippingCost = 0;
                setShippingCost(0)
                dispatch(addShippingCost(shippingObj))
                break;

            case "normal":
                shippingObj.shippingName = "normal";
                shippingObj.shippingEstimateDelivery = "3-4";
                shippingObj.shippingCost = 50;
                setShippingCost(50)
                dispatch(addShippingCost(shippingObj))
                break;

            case "fast":
                shippingObj.shippingName = "fast";
                shippingObj.shippingEstimateDelivery = "1-2";
                shippingObj.shippingCost = 100;
                setShippingCost(100)
                dispatch(addShippingCost(shippingObj))
                break;
        }
    }

    return (
        <div>
            <div onChange={handleOnChange} >
                <input type="radio" name="shippingOption" value={"free"} checked={orderData.shippingObj.shippingName == "free"}/>Free 5-7
                <input type="radio" name="shippingOption" value={"normal"} checked={orderData.shippingObj.shippingName == "normal"} />Normal 3-4
                <input type="radio" name="shippingOption" value={"fast"} checked={orderData.shippingObj.shippingName == "fast"} />Fast 1-2
            </div>
            Shipping cost: {shippingCost}
        </div>

    )
}

