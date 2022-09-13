import Product from "./Product";
import Shipping from "./shipping";

export default interface Order{
    firstName: string,
    lastName: string,
    product: Product[],
    shippingInfo: Shipping
}