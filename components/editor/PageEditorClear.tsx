import {useEffect, useState} from "react";
import { ClearTextBlock } from "./blocks/EditorTextBlock";
import {ClearHeaderBlock} from "./blocks/EditorHeaderBlock";

type Props = {
    postId: number,
    postContent: string
}


const PageEditorClear = (props:Props) => {

    const [pageContent, setPageContent] = useState([])

    useEffect(()=>{
        const testContent = JSON.parse(props.postContent)
        setPageContent(testContent)
    },[])

    return (
        <div className={"componentWrapper"}>
            {(pageContent)?
                (pageContent.map((block: any)=>{
                    if (block.name == "header"){
                        return <ClearHeaderBlock
                            key={block.id}
                            type={block.name}
                            text={block.value}
                            styling={block.style}/>
                    }else if(block.name == "textBlock"){
                        return <ClearTextBlock
                            key={block.id}
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
