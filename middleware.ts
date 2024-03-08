'use client'
import { NextRequest, NextResponse } from "next/server";


export const middleware = (request: NextRequest) => {

    const token = 'a'

    if (!token) {
        return NextResponse.redirect(
            new URL('/', request.url)
        );
    }
    
    console.log('running')
    return NextResponse.next();
}

export const config = {
    matcher: ['/profile', '/space', '/createImagination', '/settings']
}