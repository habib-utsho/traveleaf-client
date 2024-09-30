import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./services/authService";
import { TDecodedUser } from "./types/user";

// This function can be marked `async` if using `await` inside
const authRoutes = ["/signin", "/signup"];

type TRole = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  admin: [/^\/dashboard/],
  traveler: [/^\/dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = (await getCurrentUser()) as TDecodedUser;
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/signin?redirect=${pathname}`, request.url)
    );
  }

  if (user?.role && roleBaseRoutes[user?.role as TRole]) {
    const roleRoutes = roleBaseRoutes[user?.role as TRole];
    const isMatched = roleRoutes.some((route) => pathname.match(route));
    if (isMatched) {
      return NextResponse.next();
    }
  }

  //   else {
  //     if (authRoutes.includes(pathname)) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     return NextResponse.next();
  // }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/signin", "/dashboard/:page*"],
};
