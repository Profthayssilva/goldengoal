// lib/auth.ts
import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@goldengoal.com";
const ADMIN_PASS = "adminfut7goldengoal";

export function validarLogin(email: string, senha: string) {
  return email === ADMIN_EMAIL && senha === ADMIN_PASS;
}

export function criarSessao(cookieStore: ReturnType<typeof cookies>) {
  cookieStore.set("admin_token", "logado", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
  });
}


export function destruirSessao() {
  const cookieStore = cookies();
  cookieStore.delete("admin_token");
}

export function isLogado() {
  const cookieStore = cookies();
  return cookieStore.get("admin_token")?.value === "logado";
}

export function getUserRole() {
  // por enquanto somente admin existe
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;

  return token === "logado" ? "ADMIN" : "NONE";
}
