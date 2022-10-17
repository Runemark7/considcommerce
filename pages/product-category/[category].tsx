import {GetStaticPaths, GetStaticProps} from "next";
import ProductList from "../../components/ProductList";
import {useRouter} from "next/router";

const CategoryList = () => {
    const router = useRouter()
    const { category } = router.query

    return (
        <ProductList posttype={"product"} category={category} layout={"list"}/>
    );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    return {
        props: {
        },
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default CategoryList


