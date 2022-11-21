import EditorBlockSelector from "./components/EditorBlockSelector";
import {useEffect, useState} from "react";
import {EditorHeaderBlock} from "./blocks/EditorHeaderBlock";
import {EditorTextBlock} from "./blocks/EditorTextBlock";
import EditorGeneralSettings from "./components/EditorGeneralSettings";
import {EditorWrapperBlock} from "./blocks/EditorWrapperBlock";

type Props = {
    postId: number,
    onChange: any,
    postContent: string
}

type Block = {
    name: string,
    id: number,
    value: string,
    styling: string,
}

const PageEditor = (props:Props) => {
    const [pageContent, setPageContent] = useState<Block[]>([])

    useEffect(() => {
        const testContent = JSON.parse(props.postContent)
        setPageContent(testContent)
    },[props.postContent])

    const updateState = (newValue:any, id: number) => {
        const newState = pageContent.map((block:Block) => {
            if (block.id == id) {
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

    const addNewBlock = (type: string) => {
        const lastId = (pageContent)?pageContent.at(-1):0;
        const newBlock = {
            name: type,
            id: (lastId)?lastId.id+1:0,
            value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            styling: ""
        };
        if(pageContent){
            // @ts-ignore
            setPageContent(current => [...current, newBlock])
        }else{
            const tempPageContent = []
            tempPageContent.push(newBlock)
            // @ts-ignore
            setPageContent(tempPageContent)
        }
    }

    const removeBlock = (id: number) => {
        let newArr = [...pageContent]
        const index = newArr.findIndex(item => item.id == id);
        if (index !== -1){
            newArr.splice(index, 1);
            setPageContent(newArr)
        }
    }

    return (
        <div className={"componentWrapper"}>
            <EditorBlockSelector removeBlock={removeBlock} blockId={selectedBlock.id} blockType={selectedBlock.type}/>
            <div>
                {(pageContent)?
                    (pageContent.map((block: any)=>{
                        if (block.name == "header"){
                            return <EditorHeaderBlock
                                selectBlock={selectBlock}
                                blockSelected={(selectedBlock.id == block.id)}
                                changeState={updateState}
                                type={block.name}
                                id={block.id}
                                text={block.value}
                                styling={block.style}
                            />
                        }else if(block.name == "textBlock"){
                            return <EditorTextBlock
                                selectBlock={selectBlock}
                                blockSelected={(selectedBlock.id == block.id)}
                                changeState={updateState}
                                type={block.name}
                                id={block.id}
                                text={block.value}
                                styling={block.style}/>
                        }else if(block.name == "wrapperBlock"){
                            return <EditorWrapperBlock
                                selectBlock={selectBlock}
                                blockSelected={(selectedBlock.id == block.id)}
                                changeState={updateState}
                                type={block.name}
                                id={block.id}
                                text={block.value}
                                styling={block.style}
                                innerBlock={block.innerBlock}/>
                        }
                    }))
                    :<div>no content</div>}
            </div>
            <EditorGeneralSettings addNewBlock={addNewBlock}/>
        </div>
    )
}

export default PageEditor
