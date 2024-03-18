import { getCookie } from "cookies-next";
import { NextResponse, NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {

    const token: string | undefined = getCookie('token');

    if (token?.length === 0) {
        return NextResponse.redirect(new URL('/incorrectRoute', request.url));
    }

    return NextResponse.next();
    
}

export const config = {
    matcher: ['/profile', '/space', '/createImagination', '/space/[id]', '/settings']
}