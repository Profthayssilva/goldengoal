import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function requireRole(req: Request, roles: string[]) {
  // Seu NextAuth funciona sem req → então use auth() apenas
  const session = await auth();

  // Não autenticado
  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ error: "Não autenticado." }),
      { status: 401 }
    );
  }

  // Normaliza role do usuário e roles permitidas
  const userRole = (session.user.role || "").toLowerCase();
  const allowed = roles.map((r) => r.toLowerCase());

  // Sem permissão
  if (!allowed.includes(userRole)) {
    return new NextResponse(
      JSON.stringify({ error: "Acesso negado." }),
      { status: 403 }
    );
  }

  // Retorna a sessão válida
  return { user: session.user };
}
