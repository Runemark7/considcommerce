// middleware.ts
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export async function middleware (request: NextRequest) {
    let {cookies} = request;

    let access_token = await cookies.get("access_token_cookie")?.value;

    if(!access_token){
        return NextResponse.redirect(new URL("/login", request.url))
    }else {
        const requestHeaders = new Headers(request.headers)

        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        })

        response.headers.set("Access-Control-Allow-Credentials", "true")
        response.headers.set("Access-Control-Expose-Headers", "Set-Cookie")
        response.headers.set("Access-Control-Allow-Origin", "*")

        const respCookies = await fetch("http://localhost:8010/proxy/auth/cookie/admin", {
            method: "GET",
            credentials: "include",
            headers: {
                "Cookie": request.headers.get("Cookie")!
            }
        })
            .then((resp)=>{
                if (resp.status == 401){
                    return resp;
                }
            }).then((res)=>{
                const headers = res?.headers;
                return headers?.get("set-cookie");
            })


        if(respCookies){
            response.headers.set("Set-Cookie", respCookies)
        }

        return response


    }
}

export const config = {
    matcher: ['/admin/:path*', '/profile/:path*']
}