// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
    if(!request.cookies.has("jwtToken")){
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const jwtToken = request.cookies.get("jwtToken")?.value

    const endpoint = "http://localhost:8010/proxy/auth/token/admin"
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
        },
    }

    fetch(endpoint, options)
        .then((resp)=>{
            if (resp.status == 401){
                throw resp.statusText
            }
        })
        .catch((err)=>{
            fetch("http://localhost:8010/proxy/auth/refresh/token",{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + jwtToken
                },
            })
            .then((resp)=>{
                if (resp.ok){
                    return resp.json()
                }else{
                    request.cookies.delete("jwtToken")
                    return NextResponse.redirect(new URL("/login", request.url))
                }
            })
            .then((handledResp)=>{
                //set new token
                request.cookies.set("jwtToken", handledResp.access_token)
                return handledResp
            })
        })
}

export const config = {
    matcher: ['/admin/:path*', '/profile/:path*']
}