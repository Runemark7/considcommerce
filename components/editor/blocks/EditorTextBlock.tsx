import {FormEvent, useEffect, useState} from "react";

type Props = {
    changeState: any,
    blockSelected: boolean,
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

const ClearTextBlock = (props:ClearProps) => {
    return (
        <p className={props.styling}>
            {props.text}
        </p>
    )
}

const EditorTextBlock = (props:Props) => {

    const [editBlock, setEditBlock] = useState(false)

    const toggleEditor = () => {
        props.selectBlock(props.id,props.type)
        setEditBlock(true)
    }

    const handleTextChange = (e: FormEvent) => {
        props.changeState(e.target.value, props.id)
    }

    useEffect(()=>{
        setEditBlock(false)
    }, [props.blockSelected])

    return (
        <div onClick={toggleEditor} >
            {
                (editBlock)?
                    <textarea onChange={handleTextChange}>
                        {props.text}
                    </textarea>
                    : <ClearTextBlock {...props} />
            }
        </div>
    )
}

export {
    EditorTextBlock,
    ClearTextBlock
}
