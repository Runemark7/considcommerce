type Props = {
    blockId: number,
    blockType: string,
    removeBlock: any
}


const EditorBlockSelector = (props:Props) => {

    return (
        <div className={"componentWrapper"}>
            {(props.blockType)?
                <div>
                    <button onClick={()=>{
                        props.removeBlock(props.blockId)
                    }}>
                        remove this
                    </button>
                    { (props.blockType == "textBlock") ?
                        <div>
                            textBlock test
                        </div>
                        :<></>}
                    { (props.blockType == "header") ?
                        <div>
                            Select tag
                        </div>
                        :<></>}
                </div>
                :<></>}
        </div>
    )
}

export default EditorBlockSelector
