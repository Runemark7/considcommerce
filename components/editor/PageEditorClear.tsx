import {useEffect, useState} from "react";
import { ClearTextBlock } from "./blocks/EditorTextBlock";
import {ClearHeaderBlock} from "./blocks/EditorHeaderBlock";
import {ClearWrapperBlock} from "./blocks/EditorWrapperBlock";

type Props = {
    postId: number,
    postContent: string
}


const PageEditorClear = (props:Props) => {

    const [pageContent, setPageContent] = useState([])

    useEffect(()=>{
        const testContent = JSON.parse(props.postContent)
        setPageContent(testContent)
    },[props.postContent])

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
                    }else if (block.name == "wrapperBlock"){
                        return <ClearWrapperBlock
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
