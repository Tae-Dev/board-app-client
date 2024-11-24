import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userName = req.cookies.get("userName")?.value;
  const redirectedFlag = req.cookies.get("redirected");

  if (!userName && req.nextUrl.pathname !== "/signin" && !redirectedFlag) {
    console.log("Redirecting to /signin");
    const signinUrl = new URL("/signin", req.url);
    const response = NextResponse.redirect(signinUrl);
    response.cookies.set("redirected", "true", { path: "/", maxAge: 10 });
    return response;
  }

  if (req.nextUrl.pathname === "/signin") {
    console.log("Clearing redirectedFlag on /signin");
    const response = NextResponse.next();
    response.cookies.set("redirected", "", { path: "/", maxAge: 0 });
    return response;
  }

  if (userName && req.nextUrl.pathname === "/") {
    console.log("Redirecting to /dashboard/home");
    const dashboardUrl = new URL("/dashboard/home", req.url);
    return NextResponse.redirect(dashboardUrl, { status: 307 });
  }

  console.log("Passing request through Middleware");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
