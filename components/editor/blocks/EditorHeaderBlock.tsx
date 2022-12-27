import {useEffect, useState} from "react";

type BlockProps = {
    name: string,
    value: string
}

type EditorProps = {
    changeState: any,
    selectBlock: any,
    updateBlockProps: any,
    blockSelected: boolean,
    type: string,
    id: number,
    text: string,
    styling: string,
    blockProps: BlockProps[]
}

type ClearProps = {
    text: string,
    styling: string
}

interface HeaderBlock extends ClearProps{
    headerTag: string
}


const ClearHeaderBlock = (props:HeaderBlock) => {
    const element = `<${props.headerTag} class="${props.styling}">
        ${props.text}
    </${props.headerTag }>`
    return (
        <div dangerouslySetInnerHTML={{__html: element}}>
        </div>
    )
}

const EditorHeaderBlock = (props:EditorProps) => {
    const [editBlock, setEditBlock] = useState(false)

    const toggleEditor = () => {
        props.selectBlock(props.id,props.type)
        setEditBlock(true)
    }

    const handleTextChange = (text: string) => {
        props.changeState(text, props.id)
    }

    const handleBlockPropsChange = (name: string, value: string) => {
       props.updateBlockProps(name,value,props.id)
    }

    useEffect(()=>{
        setEditBlock(false)
    }, [props.blockSelected])


    const [headerTag, setHeaderTag] = useState("h1")

    useEffect(()=>{
        if(props.blockProps){
            props.blockProps.map((blockProps:BlockProps)=>{
                if (blockProps.name == "headerTag"){
                    setHeaderTag(blockProps.value)
                }
            })
        }
    },[props.blockProps])

    return (
        <div onClick={toggleEditor} >
            {
                (editBlock)?
                    <div>
                        <div>
                            topbar

                            <button onClick={()=>{
                                handleBlockPropsChange("headerTag", "h1")
                            }}>
                                H1
                            </button>


                            <button onClick={()=>{
                                handleBlockPropsChange("headerTag", "h2")
                            }}>
                                H2
                            </button>

                        </div>
                        <div
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onInput={(e)=>{
                                handleTextChange(e.currentTarget.textContent)
                            }}
                        >
                            <ClearHeaderBlock {...props} headerTag={headerTag} />
                        </div>
                    </div>


                    : <ClearHeaderBlock {...props} headerTag={headerTag} />
            }
        </div>
    )
}

export {
    EditorHeaderBlock,
    ClearHeaderBlock
}




