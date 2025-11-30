// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/forgot-password",
  "/reset-password",
];

// rotas públicas de API (reset de senha, webhooks, etc.)
const PUBLIC_API_ROUTES = [
  "/api/reset-password",
  "/api/forgot-password",
  "/api/auth",
  "/api/webhooks",
];

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  // ROTAS PÚBLICAS DE API
  if (PUBLIC_API_ROUTES.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ROTAS PÚBLICAS DE PÁGINA
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  // Se estiver logado e for para login ou raiz → manda para painel
  if (isLoggedIn && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/painel", nextUrl));
  }

  // Se não estiver logado e tentar acessar painel → login
  if (!isLoggedIn && pathname.startsWith("/painel")) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Permite rotas públicas
  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/login",
    "/forgot-password",
    "/reset-password/:path*",
    "/painel/:path*",
    // 👇 APIs ficam de fora para evitar loops e bloqueios
  ],
};
