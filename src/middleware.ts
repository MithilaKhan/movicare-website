
import { NextRequest, NextResponse } from "next/server";


export async function middleware(Request: NextRequest) {
    try {
        const url = await Request.nextUrl.pathname
        const searchParams = Request.nextUrl.searchParams;
        const accessToken = searchParams.get('accessToken') || '';

        const refreshToken = searchParams.get('refreshToken') || '';

        if (url === '/' && accessToken && refreshToken) {
            {
                // Set cookies
                const response = NextResponse.redirect(new URL("/", Request.url));

                response.cookies.set("accessToken", accessToken, {
                    // httpOnly: true,  
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                    secure: false,
                    sameSite: "lax",
                });

                response.cookies.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                });

                return response;
            }
        }

        NextResponse.next();



    } catch (error) {
        console.error("Error in middleware:", error);


    }
}

export const config = {
    matcher: ['/']
}