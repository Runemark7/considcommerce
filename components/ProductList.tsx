import Product from "../models/Product";
import ProductListItem from "./productListItem";
import {useEffect, useState} from "react";

type Props = {
    posttype: String,
    category: String,
    layout: String
}

const ProductList = (props:Props) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=>{
        const endpoint = `http://localhost:8010/proxy/api/posttype/${props.posttype}`;

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
            setProducts(data)
        })
    },[])

    if(props.layout == "list"){
        return (
            <div>
                {(products)?
                    <div className={"productListWrapper"}>
                        {products.map((product: Product)=>(
                            <ProductListItem product={product} layout={"list"}/>
                        ))}
                    </div>
                    :<div>Can't find any products</div>}
            </div>
        )
    }else{
        return (
            <div>
                {(products)?
                    <div className={"productListWrapper"}>
                        {products.map((product: Product)=>(
                            <ProductListItem product={product} layout={"list"}/>
                        ))}
                    </div>
                    :<div>Can't find any products</div>}
            </div>
        )
    }

}

export default ProductList
