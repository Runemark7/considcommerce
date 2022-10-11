import ProductList from "../components/ProductList";

const Home = () => {

    return(
        <div className={"homeWrapper"}>
            <div>
                <ProductList posttype={"product"} category={"test"} />
                Home
            </div>
        </div>
    )
}

export default Home
