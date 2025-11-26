// lib/requireRole.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ROLES } from "./roles";

export async function requireRole(req: Request, roles: string[]) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (!roles.includes(session.user.role)) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  return session;
}
