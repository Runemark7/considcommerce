import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../../store/cartSlice";

/*import Product from "../../../models/Product";
import PropTypes from "prop-types";*/

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


//something like this to make product requirement, so i dont need to fix a lot for logic arount that
/*
    AddToCart.propTypes = {
        product: PropTypes.instanceOf(Product).isRequired
    }
* */

