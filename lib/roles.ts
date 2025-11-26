// lib/roles.ts

// Papéis existentes no sistema
export const ROLES = {
  ADMIN: "admin",
  GESTOR: "gestor",
} as const;

// Validar se usuário tem um dos papéis permitidos
export function hasRole(userRole: string | undefined, allowed: string[]) {
  if (!userRole) return false;
  return allowed.includes(userRole);
}
