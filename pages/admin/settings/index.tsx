import type { NextPage } from 'next'
import {FormEvent} from "react";

const AdminCustomizerSettings: NextPage = () => {

    const handleSubmit = (e :FormEvent) => {
        e.preventDefault()

    }

    return (
        <div className={"componentWrapper"}>
            <h1>
                Customizer settings
            </h1>

            <form onSubmit={(e:FormEvent)=>{
                handleSubmit(e)
            }}>
                <label htmlFor={"homePageRoute"}>Home page</label>
                <input type="text" name={"homePageRoute"}/>

                <label htmlFor={"pageName"}>Store name</label>
                <input type="text" name={"pageName"}/>

                <input type="submit" value={"Save"}/>
            </form>
        </div>
    )
}

export default AdminCustomizerSettings
