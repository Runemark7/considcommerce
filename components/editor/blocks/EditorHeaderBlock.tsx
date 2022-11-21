import {FormEvent, useEffect, useState} from "react";

type EditorProps = {
    changeState: any,
    selectBlock: any,
    blockSelected: boolean,
    type: string,
    id: number,
    text: string,
    styling: string,
}

type ClearProps = {
    type: string,
    text: string,
    styling: string
}

const ClearHeaderBlock = (props:ClearProps) => {
    return (
        <h1 className={props.styling}>
            {props.text}
        </h1>
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

    useEffect(()=>{
        setEditBlock(false)
    }, [props.blockSelected])

    return (
        <div onClick={toggleEditor} >
            {
                (editBlock)?
                    <div
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onInput={(e)=>{
                            handleTextChange(e.currentTarget.textContent)
                        }}
                    >
                        <ClearHeaderBlock {...props} />
                    </div>

                    : <ClearHeaderBlock {...props} />
            }
        </div>
    )
}

export {
    EditorHeaderBlock,
    ClearHeaderBlock
}




