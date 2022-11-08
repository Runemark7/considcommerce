import EditorBlockSelector from "./components/EditorBlockSelector";
import {useEffect, useState} from "react";
import EditorHeaderBlock from "./blocks/EditorHeaderBlock";
import EditorTextBlock from "./blocks/EditorTextBlock";

type Props = {
    postId: number,
}

const PageEditor = (props:Props) => {

    const [pageContent, setPageContent] = useState([])

    useEffect(()=>{
        const testContent = {
            blocks: [
                {
                    id: 1,
                    name: "header",
                    value: "post 1266 nicee",
                    style: "red-text"
                },
                {
                    id: 2,
                    name: "header",
                    value: "coolt igen",
                    style: "red-text"
                },
                {
                    id: 3,
                    name: "textBlock",
                    value: "cool text här",
                    style: "red-text"
                },

            ]
        }

        setPageContent(testContent.blocks)
    },[])

    const updateState = (newValue:any, id: number) => {
        const newState = pageContent.map((block:any)=>{
            if (block.id == id){
                return {...block, value:newValue}
            }
            return block
        })
        setPageContent(newState)
    }

    return (
        <div className={"componentWrapper"}>
            editor {props.postId}

            <h3>content</h3>
            {(pageContent)?
                (pageContent.map((block: any)=>{
                    if (block.name == "header"){
                        return <EditorHeaderBlock headerText={block.value} headerColor={block.style}/>
                    }else if(block.name == "textBlock"){
                        return <EditorTextBlock changeState={updateState} id={block.id} text={block.value} styling={block.style}/>
                    }
                }))
                :<div>no content</div>}
            <EditorBlockSelector/>
        </div>
    )
}

export default PageEditor
