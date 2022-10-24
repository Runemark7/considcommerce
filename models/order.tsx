import Post from "./Post";

export default interface Order extends Post{
    firstName: string,
    lastName: string,
    orderStatus: string
}