type Props = {
    blockId: number,
    blockType: string
}


const EditorBlockSelector = (props:Props) => {

    return (
        <div className={"componentWrapper"}>
            {(props.blockType)?
                <div>
                    { (props.blockType == "textBlock") ?
                        <div>
                            select color
                        </div>
                        :<></>}
                </div>
                :<></>}

            editor block settings
        </div>
    )
}

export default EditorBlockSelector
