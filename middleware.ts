import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  let cookieValue = request.cookies.get("my-cookie")?.value;
  if (!cookieValue) {
    cookieValue = "default";
    request.cookies.set("my-cookie", cookieValue);
  }

  const rewriteUrl = new URL(
    `/cookie/${cookieValue}` + request.nextUrl.pathname,
    request.url
  );
  console.log("middleware ::", request.url, "->", rewriteUrl.href);
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
