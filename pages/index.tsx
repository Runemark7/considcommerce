import ProductList from "../components/ProductList";

const Home = () => {

    return(
        <div className={"homeWrapper"}>
            <div>
                <h1>Home</h1>
                <ProductList posttype={"product"} category={"hoodie"} layout={"list"}/>
            </div>
        </div>
    )
}

export default Home
