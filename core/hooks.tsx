interface SingleHook {
    posttype: string,
    position: string,
    hookName: string,
    action: string,
    callBackFunction: Function
}

class Hook {
    posttype: string | undefined;
    position: string | undefined;
    hookName: string | undefined;
    action: string | undefined;
    callBackFunction: Function;

    constructor(posttype:string,action:string ,position:string, hookName:string, callBackFunction: Function){
        this.position = position;
        this.posttype = posttype;
        this.hookName = hookName;
        this.action = action;
        this.callBackFunction = callBackFunction;
    }

    doAction = (data: any) => {
        return this.callBackFunction(data)
    }
}

class HookHandler {
    globalHooks:Hook[] = []

    registerHook = (hook: SingleHook) => {
        const singleHook:Hook = new Hook(hook.posttype, hook.action, hook.position, hook.hookName, hook.callBackFunction)
        let checkIfExists = false;
        this.globalHooks.map((hook: Hook)=>{
            if(hook.hookName == singleHook.hookName){
                checkIfExists = true
            }
        })
        if (!checkIfExists){
            this.globalHooks.push(singleHook)
        }
    }

    doActionOnHook = (data:any, posttype:string, position:string, action:string, hookName: string) => {
        let returnInfo = null;

        console.log("test")
        this.globalHooks.map((hook: Hook)=>{

            if (hook.hookName == hookName && hook.action == action && hook.posttype == posttype && hook.action == action){
                returnInfo = hook.doAction(data)
            }
        })

        return returnInfo
    }
}

export { HookHandler }
