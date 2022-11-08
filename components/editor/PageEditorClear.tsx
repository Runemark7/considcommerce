import {useEffect, useState} from "react";
import EditorHeaderBlock from "./blocks/EditorHeaderBlock";
import { ClearTextBlock } from "./blocks/EditorTextBlock";

type Props = {
    postId: number,
}


const PageEditorClear = (props:Props) => {

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

    return (
        <div className={"componentWrapper"}>
            {(pageContent)?
                (pageContent.map((block: any)=>{
                    if (block.name == "header"){
                        return <EditorHeaderBlock
                            headerText={block.value}
                            headerColor={block.style}/>
                    }else if(block.name == "textBlock"){
                        return <ClearTextBlock
                            type={block.name}
                            text={block.value}
                            styling={block.style}/>
                    }
                }))
                :<div>no content</div>}
        </div>
    )
}

export default PageEditorClear
