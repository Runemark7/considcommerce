import {useState} from "react";

type Props = {
    addNewBlock: any
}


const EditorGeneralSettings = (props:Props) => {
    const chooseBlock = [
        {
           type: "header",
        },
        {
            type: "textBlock",
        },
    ]

    const [chooseABlock, setChooseABlock] = useState(false)

    return (
        <div className={"componentWrapper"}>

            <div className={`${(chooseABlock)?"showDiv":"hideDiv"}`}>
                <div>
                    {(chooseBlock)?
                        (chooseBlock.map((block: any)=>(
                                <div onClick={()=>{
                                    setChooseABlock(false)
                                }}>
                                    <button onClick={()=>{
                                        props.addNewBlock(block.type)
                                    }}>
                                        {block.type}
                                    </button>
                                </div>
                            )
                        ))
                        :<div>no content</div>}
                </div>
            </div>

            <button onClick={() => {
                setChooseABlock(true)
            }}>
                add another block
            </button>

        </div>
    )
}

export default EditorGeneralSettings
