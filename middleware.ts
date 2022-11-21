// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware (request: NextRequest) {
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

    const test = await fetch(endpoint, options)
        .then((resp)=>{
            if(resp.status == 401) {
                throw "error"
            }
        }).then((res)=>{
            return NextResponse.redirect(new URL("/login", request.url))
        })
        .catch((err)=>{
            return false
        })

    /*
    if (!test){

        const options = {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + jwtToken,
            },
        }

        fetch("http://localhost:8010/proxy/api/refresh", options)
            .then((resp)=>{
                if (resp.ok){
                    return resp.json()
                }
            })
            .then((handledResp)=>{
                console.log(request.cookies.get("jwtToken"))
                request.cookies.set("jwtToken", handledResp.access_token)
                console.log(request.cookies.get("jwtToken"))


            })
    }*/
}

export const config = {
    matcher: ['/admin/:path*', '/profile/:path*']
}