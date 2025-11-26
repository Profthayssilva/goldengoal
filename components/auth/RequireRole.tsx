"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireRole({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // Busca o role REAL via cookie (API /auth/me)
  useEffect(() => {
    async function load() {
      try {
        const r = await fetch("/api/auth/me");
        const data = await r.json();

        if (!data.logado) {
          router.replace("/login");
          return;
        }

        setRole(data.role); // "ADMIN", "GESTOR", etc.
      } catch (err) {
        router.replace("/login");
      }
    }

    load();
  }, [router]);

  // Enquanto busca
  if (!role) return null;

  // Normaliza case
  const normalizedAllowed = allowed.map((r) => r.toUpperCase());

  // Verifica permissão
  if (!normalizedAllowed.includes(role.toUpperCase())) {
    router.replace("/painel/dashboard");
    return null;
  }

  return <>{children}</>;
}
