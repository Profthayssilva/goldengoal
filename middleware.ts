import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;
  const path = req.nextUrl.pathname;

  const isPainel = path.startsWith("/painel");

  if (isPainel && token !== "logado") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Proteções internas por rota:
  if (path.startsWith("/painel/admin") && token !== "logado") {
    return NextResponse.redirect(new URL("/painel/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*"],
};
