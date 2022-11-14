import Product from "../models/Product";
import ProductListItem from "./productListItem";
import {FormEvent, useEffect, useState} from "react";

type Props = {
    posttype: String,
    category: String,
    layout: String
}

const ProductList = (props:Props) => {
    const [products, setProducts] = useState<Product[]>([]);

    const compare = (a: Product, b: Product) => {
        if (parseInt(a.product_price) < parseInt(b.product_price)){
            return -1;
        } else if (parseInt(a.product_price) > parseInt(b.product_price)){
            return 1;
        }else{
            return 0
        }
    }

    const highLow = (a: Product, b: Product) => {
        if (parseInt(a.product_price) > parseInt(b.product_price)){
            return -1;
        } else if (parseInt(a.product_price) < parseInt(b.product_price)){
            return 1;
        }else{
            return 0
        }
    }

    useEffect(()=>{
        const endpoint = `http://localhost:8010/proxy/category/${props.category}`;

        const options = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }

        fetch(endpoint, options).then((response)=>{
            if (response.status==201){
                return response.json()
            }
        }).then((data)=>{
            setProducts(data.sort(compare))
        })
    },[props])

    const [activeFilter, setActiveFilter] = useState(0)

    const filterOption = (e: FormEvent) => {
        const value = e.target.value
        switch (value){
            case "0":
                setProducts((prevProducts)=> [...prevProducts.sort(compare)])
                setActiveFilter(value)
                break;
            case "1":
                setProducts((prevProducts)=> [...prevProducts.sort(compare)])
                setActiveFilter(value)
                break;
            case "2":
                setProducts((prevProducts)=> [...prevProducts.sort(highLow)])
                setActiveFilter(value)
                break;

        }
    }

    if(props.layout == "list"){
        return (
            <div className={"componentWrapper"}>
                <div>
                    <p>
                        Filter:
                    </p>
                    <select onChange={filterOption}>
                        <option value="0" defaultChecked={true}>Default</option>
                        <option value="1">Price rising</option>
                        <option value="2">Price falling</option>
                    </select>
                </div>
                {(products)?
                    <div className={"productListWrapper"}>
                        {products.map((product: Product)=>(
                            <ProductListItem product={product} layout={"list"}/>
                        ))}
                    </div>
                    :<div>Can't find any products</div>}
                {(products.length > 4)?
                    <div>
                        yo

                    </div>
                :<></>}
            </div>
        )
    }else{
        return (
            <div className={"componentWrapper"}>
                {(products)?
                    <div className={"productListWrapper"}>
                        {products.map((product: Product)=>(
                            <ProductListItem product={product} layout={"list"}/>
                        ))}
                    </div>
                    :<div>Can't find any products</div>}
                {(products.length > 4)?
                    <div>
                        paginering
                    </div>
                    :<></>}
            </div>
        )
    }

}

export default ProductList
