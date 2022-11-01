import {hooks} from "../pages/_app";

const test = (data: any) => {
    console.log("test")
}

hooks.registerHook({
    posttype: "product",
    action: "updatePost",
    position: "after",
    hookName: "afterAdminSubmit",
    callBackFunction: test
})

