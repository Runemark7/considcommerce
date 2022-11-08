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

    const [selectedBlock, setSelectedBlock] = useState({
        id:0,
        type:""
    })

    const selectBlock = (id:number, type: string) => {
        setSelectedBlock({...selectedBlock, id:id, type:type})
    }

    return (
        <div className={"componentWrapper"}>
            <h3>PageContent Preview</h3>

            <div>
                {(pageContent)?
                    (pageContent.map((block: any)=>{
                        if (block.name == "header"){
                            return <EditorHeaderBlock headerText={block.value} headerColor={block.style}/>
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
