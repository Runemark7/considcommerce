import EditorBlockSelector from "./components/EditorBlockSelector";
import {useEffect, useState} from "react";
import {EditorHeaderBlock} from "./blocks/EditorHeaderBlock";
import {EditorTextBlock} from "./blocks/EditorTextBlock";

type Props = {
    postId: number,
    onChange: any,
    postContent: string
}


type Block = {
    id: number,
    name: string,
    value: any,
    style: string
}

const PageEditor = (props:Props) => {

    const [pageContent, setPageContent] = useState([])

    useEffect(()=>{
        const testContent = JSON.parse(props.postContent)
        setPageContent(testContent)
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

    useEffect(()=>{
        props.onChange(JSON.stringify(pageContent))
    },[pageContent])

    const [selectedBlock, setSelectedBlock] = useState({
        id:0,
        type:""
    })

    const selectBlock = (id:number, type: string) => {
        setSelectedBlock({...selectedBlock, id:id, type:type})
    }

    return (
        <div className={"componentWrapper"}>
            <div>
                {(pageContent)?
                    (pageContent.map((block: any)=>{
                        if (block.name == "header"){
                            return <EditorHeaderBlock
                                selectBlock={selectBlock}
                                changeState={updateState}
                                type={block.name}
                                id={block.id}
                                text={block.value}
                                styling={block.style}/>
                        }else if(block.name == "textBlock"){
                            return <EditorTextBlock
                                selectBlock={selectBlock}
                                changeState={updateState}
                                type={block.name}
                                id={block.id}
                                text={block.value}
                                styling={block.style}/>
                        }
                    }))
                    :<div>no content</div>}
            </div>

            <EditorBlockSelector blockId={selectedBlock.id} blockType={selectedBlock.type}/>
        </div>
    )
}

export default PageEditor
