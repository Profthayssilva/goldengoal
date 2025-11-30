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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data.logado) {
          router.replace("/login");
          return;
        }

        setRole(data.role);
      } catch (error) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  // Enquanto carrega, não renderiza nada (evita flicker)
  if (loading) return null;

  // Normaliza role
  const normalizedAllowed = allowed.map((r) => r.toUpperCase());

  // Sem permissão
  if (!role || !normalizedAllowed.includes(role.toUpperCase())) {
    router.replace("/painel/dashboard");
    return null;
  }

  // Autorizado
  return <>{children}</>;
}
