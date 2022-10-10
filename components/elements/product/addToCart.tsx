import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../../store/cartSlice";

export default function AddToCart(props: any) {
    const dispatch = useDispatch();

    return (
        <button

            onClick={()=>{
                dispatch(addItemToCart(props.product))
            }}
        >
            add to cart
        </button>
    )
}
