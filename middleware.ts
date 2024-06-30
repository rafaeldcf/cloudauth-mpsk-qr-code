import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Check cookies and redirect to the /config page if we cannot find them.
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("central-auth-token");
  if (!hasCookie && request.nextUrl.pathname != "/config") {
    return NextResponse.redirect(new URL("/config", request.url));
  }

  // Default redirection
  const response = NextResponse.next();
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  //matcher: ["/((?!_next/image|favicon.ico).*)"],
  matcher: ["/((?!.*\\.webmanifest|api|_next/static|_next/image|.*\\.png$).*)"],
  //matcher: ["/((?!.*\\.webmanifest|_next/static|_next/image|.*\\.png$).*)"],
};
