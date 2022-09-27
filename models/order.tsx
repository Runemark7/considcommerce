import Product from "./Product";
import Shipping from "./shipping";

enum orderStatus {
    "pending",
    "shipped",
    "processing",
    "onhold",
    "completed",
    "cancelled",
    "refunded",
    "failed"
}

export default interface Order{
    firstName: string,
    lastName: string,
    orderStatus: orderStatus
}