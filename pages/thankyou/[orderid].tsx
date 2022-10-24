import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import {GetStaticPaths, GetStaticProps} from "next";

const ThankYouIndex = () => {
    const router = useRouter()
    const { orderid } = router.query
    const [callbackHTML, setCallbackHTML] = useState();

    useEffect(()=>{
        const endpoint = `https://api.playground.klarna.com/checkout/v3/orders/${orderid}`

        const options = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa('PK64251_9ae70e07d814:GwxiSlLjCLj8t8B3'),
            },
        }

        fetch(endpoint, options)
            .then(resp=>{
                if (resp.ok){
                    return resp.json()
                }
            })
            .then(data => {
                setCallbackHTML(data.html_snippet)
            })
    }, [] )

    useEffect(()=>{
        if (callbackHTML){
            var checkoutContainer = document.getElementById('my-checkout-container')
            // @ts-ignore
            checkoutContainer.innerHTML = callbackHTML.replace(/\\"/g, "\"").replace(/\\n/g, "");
            // @ts-ignore
            var scriptsTags = checkoutContainer.getElementsByTagName('script')
            for (var i = 0; i < scriptsTags.length; i++) {
                var parentNode = scriptsTags[i].parentNode
                var newScriptTag = document.createElement('script')
                newScriptTag.type = 'text/javascript'
                newScriptTag.text = scriptsTags[i].text
                // @ts-ignore
                parentNode.removeChild(scriptsTags[i])
                // @ts-ignore
                parentNode.appendChild(newScriptTag)
            }
        }
    }, [callbackHTML])

    return (
        <div className={"productWrapper"}>
            <div id={"my-checkout-container"}></div>
        </div>
    );
}

export default ThankYouIndex

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
