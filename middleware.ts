import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userName = req.cookies.get("userName")?.value;
  const redirectedFlag = req.cookies.get("redirected");

  if (!userName && req.nextUrl.pathname !== "/signin" && !redirectedFlag) {
    const signinUrl = new URL("/signin", req.url);
    const response = NextResponse.redirect(signinUrl);
    response.cookies.set("redirected", "true", { path: "/", maxAge: 10 });
    return response;
  }

  if (req.nextUrl.pathname === "/signin") {
    const response = NextResponse.next();
    response.cookies.set("redirected", "", { path: "/", maxAge: 0 });
    return response;
  }

  if (userName && req.nextUrl.pathname === "/") {
    const dashboardUrl = new URL("/dashboard/home", req.url);
    return NextResponse.redirect(dashboardUrl, { status: 307 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
