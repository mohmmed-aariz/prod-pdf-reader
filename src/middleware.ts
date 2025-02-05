import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NEXT_AUTH } from './app/api/auth/[...nextauth]/options';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    // const session = await getServerSession({req: request},NEXT_AUTH);
    // const session = await getServerSession({req: request})
    const url = request.nextUrl;
    const { pathname } = url;

    console.log("Token from middleware is:", token);
    // console.log("Session from middleware is:", session);


    // Redirect users from root path '/' to '/user'
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/user', request.url));
    }

    // Allow access to /agency/signup and /agency/signin without authentication
    if (pathname.startsWith('/agency/signup') || pathname.startsWith('/agency/signin')) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access any /agency path to /agency/signin
    if (!token && pathname.startsWith('/agency')) {
        return NextResponse.redirect(new URL('/agency/signin', request.url));
    }

    // Check if the user role is 'AGENCY_USER' or 'ADMIN'
    const allowedRoles = ['AGENCY_USER', 'ADMIN'];
    if (token && pathname.startsWith('/agency') && !allowedRoles.includes(token.role.toString())) {
        return NextResponse.redirect(new URL('/agency/signin', request.url));
    }

    // Redirect authenticated users with role 'USER' trying to access /register to /user
    if (token && token.role.toString() === 'USER' && pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/user', request.url));
    }

    // Optionally, redirect authenticated users from /agency/signup and /agency/signin to /agency
    if (token && (pathname.startsWith('/agency/signup') || pathname.startsWith('/agency/signin'))) {
        return NextResponse.redirect(new URL('/agency', request.url));
    }

    // Continue to the next middleware or handler if no other conditions match
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/agency/:path*',
        '/register',
        '/'
    ],
};



// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({ req: request });
//     const url = request.nextUrl;
//     const { pathname } = url;

//     console.log("Token from middleware is:", token);

//     // Allow access to /agency/signup and /agency/signin without authentication
//     if (pathname.startsWith('/agency/signup') || pathname.startsWith('/agency/signin')) {
//         return NextResponse.next();
//     }

//     // Redirect unauthenticated users trying to access any /agency path to /agency/signin
//     if (!token && pathname.startsWith('/agency')) {
//         return NextResponse.redirect(new URL('/agency/signin', request.url));
//     }

//     // Optionally, redirect authenticated users from /agency/signup and /agency/signin to /agency
//     if (token && (pathname.startsWith('/agency/signup') || pathname.startsWith('/agency/signin'))) {
//         return NextResponse.redirect(new URL('/agency', request.url));
//     }

//     // Continue to the next middleware or handler if no other conditions match
//     return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: [
//         '/agency/:path*',
//     ],
// };


// // middleware: jane se pahele milkar jana!

// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// // export { default } from "next-auth/middleware"


 
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({req: request})
//     const url = request.nextUrl;
//     console.log("token from middleware is: ", token)

//     if( token && (
//         url.pathname.startsWith('/agency/signup') ||
//         url.pathname.startsWith('/agency/signin')
//      )
//     ){
//         return NextResponse.redirect(new URL(`/agency`, request.url))
//     } else if( !token && (
//         url.pathname.startsWith('/agency/signup') ||
//         url.pathname.startsWith('/agency/signin') 
//       )
//     ){
//         return NextResponse.redirect(new URL(`/${request.nextUrl.pathname}/`, request.url))
//     }

// //     if( token && (
// //         url.pathname.startsWith('/register') 
// //     )
// //     ){
// //         return NextResponse.redirect(new URL(`/user`, request.url))
// //     }

    

// //   return NextResponse.redirect(new URL(`/${request.nextUrl.pathname}/`, request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/agency/:path*',
//     // '/user/:path*',
//     // '/register',
//     // '/chapter/:path'

// ]
// }

// // export { default } from "next-auth/middleware"

// // export const config = { matcher: ["/agency"] }