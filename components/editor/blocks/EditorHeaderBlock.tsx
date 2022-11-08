type Props = {
    headerText: string,
    headerColor: string
}

const EditorHeaderBlock = (props:Props) => {

    return (
        <div className={"componentWrapper"}>
            <h1 className={props.headerColor} >
                {props.headerText}
            </h1>
        </div>
    )
}

export default EditorHeaderBlock
