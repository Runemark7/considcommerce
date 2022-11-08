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
                            d
                        </div>
                        :<></>}
                </div>
                :<></>}

            editor block settings
        </div>
    )
}

export default EditorBlockSelector
