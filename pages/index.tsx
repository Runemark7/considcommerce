import ProductList from "../components/ProductList";

const Home = () => {

    return(
        <div className={"homeWrapper"}>
            <div>
                Home
                <ProductList posttype={"product"} category={"hoodie"} layout={"list"}/>
            </div>
        </div>
    )
}

export default Home
