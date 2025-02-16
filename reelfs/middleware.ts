import NextAuth from "next-auth";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // allow auth releted route
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        if (pathname === "/" || pathname.startsWith("api/video")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder (for serving images/icons)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|public).*)",
//   ],
// };

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/|.*\\.svg$).*)"],
};
