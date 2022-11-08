import {FormEvent, useState} from "react";

type EditorProps = {
    changeState: any,
    selectBlock: any,
    type: string,
    id: number,
    text: string,
    styling: string
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

    const handleTextChange = (e : FormEvent) => {
        props.changeState(e.target.value, props.id)
    }

    return (
        <div onClick={toggleEditor} contentEditable={editBlock} >
            {
                <ClearHeaderBlock onChange={handleTextChange} {...props} />
            }
        </div>
    )
}

export {
    EditorHeaderBlock,
    ClearHeaderBlock
}




