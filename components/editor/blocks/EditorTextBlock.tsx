import {FormEvent, useState} from "react";

type Props = {
    changeState: any,
    selectBlock: any,
    type: string,
    id: number,
    text: string,
    styling: string
}

const EditorTextBlock = (props:Props) => {

    const [hoverBlock, setHoverBlock] = useState(false)

    const handleMouseOver = () => {
        props.selectBlock(props.id,props.type)
        setHoverBlock(true)
    }

    const handleMouseOut = () => {
        setHoverBlock(false)
    }

    const handleTextChange = (e : FormEvent) => {
        props.changeState(e.target.value, props.id)
    }

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {
                (hoverBlock)?
                    <textarea onChange={handleTextChange}>
                        {props.text}
                    </textarea>
                    : <p className={props.styling}>
                        {props.text}
                    </p>
            }
        </div>
    )
}

export default EditorTextBlock