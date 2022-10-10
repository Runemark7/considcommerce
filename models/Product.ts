import Post from "./Post";

export default interface Product extends Post{
    product_price: string,
    product_quantity: number
}